import React, {Component} from 'react';
import PaginationTable from "./components/table/PaginationTable";
import Button from "@material-ui/core/Button";
import PlusIcon from '@material-ui/icons/Add';
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import ReactDialog from "./components/common/ReactDialog";
import KatilimciTable from "./components/table/KatilimciTable";
import "./App.css"
class App extends Component {


  studentDialogFields = [
    {id: "etkinlikAdi", label: "Etkinlik Adı", type: "text"},
    {id: "startDate", label: "Başlangıç Tarihi", type: "date"},
    {id: "endDate", label: "Bitiş Tarihi", type: "date"},
    {id: "kota", label: "Kontenjan", type: "number"},
      {id: "konum", label: "Konum", type: "text"},
  ]
    updateDialogFields = [
        {id: "startDate", label: "Başlangıç Tarihi", type: "date"},
        {id: "endDate", label: "Bitiş Tarihi", type: "date"},
        {id: "kota", label: "Kontenjan", type: "number"},
        {id: "konum", label: "Konum", type: "text"},
    ]
  katilimciDialogFields = [
    {id: "name", label: "Katılımcı Adı", type: "text"},
    {id: "email", label: "E-Mail", type: "email"},
    {id: "tcKimlikNo", label: "T.C Kimlik No", type: "text"},
  ]


  constructor() {
    super();
    this.state = {
      rows: [],
      krows:[],
        checktime:[],
        addEtkinlikModalOpen: false,
      addKatilimci : false,
      showKatilimci: false,
      updateEtkinlikModalOpen : false,
        mapModal : false,
        temp1:"",
      snackbarProperties: {isOpen: false, message: "", severity: ""},
      temp : ""
    }
  }

  componentDidMount() {
    axios.get("/etkinlik")
      .then(response => {
        this.setState({rows: response.data})
      })
  }

  toggleAddEtkinlikModal = () => {
    this.setState({addEtkinlikModalOpen: !this.state.addEtkinlikModalOpen})
  }
  toggleMap = (etkinlik) => {
      this.setState({mapModal: !this.state.mapModal,

      })
      axios.get("/etkinlik/"+etkinlik)
          .then(response => {
              this.setState({
                  temp1: "https://maps.google.com?q="+response.data.konum
              })
          })
  }

  toggleAddKullanici = (etkinlik) => {
    this.setState({addKatilimci: !this.state.addKatilimci,temp: etkinlik})
  }
  toggleUpdateEtkinlikModal = (etkinlik) => {
      // Tarih Güncelleme Check!!
      axios.get("/etkinlik/"+etkinlik)
          .then(response => {
              if(Date.parse(new Date())< Date.parse(response.data.startDate)){
                  this.setState({
                      updateEtkinlikModalOpen: !this.state.updateEtkinlikModalOpen, temp: etkinlik})}
              else {this.snackbarOpen("Tarihi Geçmiş Etkinlik Güncellenemez.", "error");}})}
  toggleShowKullaniciModal = () => {
    this.setState({showKatilimci: !this.state.showKatilimci})
  }
  togupdate = () => {
      this.setState({updateEtkinlikModalOpen: !this.state.updateEtkinlikModalOpen})
  }

  addEtkinlik = (inputData) => {
    this.toggleAddEtkinlikModal();
      if(Date.parse(inputData.startDate) < Date.parse(inputData.endDate)){
          axios.post("/etkinlik", inputData).then(response => {console.log(response.data)
              this.setState(prevState => ({rows: [...prevState.rows, response.data]}));
              this.snackbarOpen("Etkinlik Başarıyla Oluşturuldu.", "success");
          }).catch(error => {
              if (error.response.status === 400) {
                  this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")}
              console.log(error.response);})}
      else{this.snackbarOpen("Başlangıç tarihi Bitiş tarihinden sonra olamaz.", "error");}}

  snackbarOpen = (message, severity) => {
    this.setState(prevState => {
      let snackbarProperties = {...prevState.snackbarProperties}
      snackbarProperties.isOpen = true;
      snackbarProperties.message = message;
      snackbarProperties.severity = severity;
      return {snackbarProperties};
    })
  }

  snackbarClose = () => {
    this.setState(prevState => {
      let snackbarProperties = {...prevState.snackbarProperties}
      snackbarProperties.isOpen = false;
      snackbarProperties.message = "";
      snackbarProperties.severity = "";
      return {snackbarProperties};
    })
  }

  onEtkinlikDelete = (etkinlikAdi) => {
      // Silme Tarihi Check!!

      axios.get("/etkinlik/"+etkinlikAdi).then(response => {
              if(Date.parse(new Date()) < Date.parse(response.data.startDate)){
                  axios.delete("/etkinlik/"+etkinlikAdi).then(response => {
                          this.setState( {
                              rows: this.state.rows.filter((etkinlik) => etkinlik.etkinlikAdi !== etkinlikAdi)})
                          this.snackbarOpen( etkinlikAdi + " isimli etkinlik silinmiştir.", "success")})}

              else {this.snackbarOpen("Tarihi Geçmiş Etkinlik Silinemez.", "error");}})
  }

              
  onShowKatilimci = (etkinlikAdi) =>{
    this.toggleShowKullaniciModal();
    axios.get("/etkinlik/"+etkinlikAdi+ "/kullanici")
        .then(response => {
          this.setState({krows: response.data})
        })
  }

  onAddKatilimci = (inputData) => {
    this.toggleAddKullanici();
    inputData.etkinlikAdi = this.state.temp;
      axios.post("/etkinlik/"+inputData.etkinlikAdi+"/kullanici", inputData).then(response => {
        this.snackbarOpen(inputData.name+" isimli kullanıcı " +
            inputData.etkinlikAdi+" etkinliğine başarıyla kaydedilmiştir!", "success");
      }).catch(error => {
        if (error.response.status === 400) {
          this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")}})}


  onEtkinlikUpdate = (inputData) => {
    inputData.etkinlikAdi = this.state.temp;
    axios.put("/etkinlik/"+this.state.temp,inputData).then(response => {
          this.setState(prevState => (
              {rows: this.state.rows.map(event => event.eventId === inputData.eventId ? response.data : event)}));
          this.snackbarOpen("Etkinlik Başarıyla Güncellendi.", "success");
        }).catch(error => {
          if (error.response.status === 400) {
            this.snackbarOpen(error.response.data.errors[0].defaultMessage,
                "error")}console.log(error.response);})
      this.setState({
          updateEtkinlikModalOpen: !this.state.updateEtkinlikModalOpen})}

  render() {

    return (

      <div className="App">
        <h1 style={
          {
            color: "white",
          }
        }> Etkinlik Yönetim Sistemi </h1>

        <Button variant="contained"
                style={{float: "center",
                  color:"white",
                  backgroundColor:"green",
                }}
                onClick={this.toggleAddEtkinlikModal}
                startIcon={<PlusIcon/>}>
          Etkinlik Ekle
        </Button>

        <Snackbar open={this.state.snackbarProperties.isOpen} autoHideDuration={5000} onClose={this.snackbarClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
          <Alert onClose={this.snackbarClose} severity={this.state.snackbarProperties.severity}>
            {this.state.snackbarProperties.message}
          </Alert>
        </Snackbar>

        <ReactDialog fields={this.studentDialogFields} title="Etkinlik Ekle"
                     isOpen={this.state.addEtkinlikModalOpen}
                     onClose={this.toggleAddEtkinlikModal}
                     onSubmit={this.addEtkinlik}/>

        <PaginationTable rows={this.state.rows} onUpdate={this.toggleUpdateEtkinlikModal}
                         onDelete={this.onEtkinlikDelete} onAddKatilimci={this.toggleAddKullanici}
                         onShowKatilimci={this.onShowKatilimci} onMap={this.toggleMap}/>

        <ReactDialog fields={this.updateDialogFields} title="Etkinlik Güncelle" isOpen={this.state.updateEtkinlikModalOpen} onClose={this.togupdate}
                     onSubmit={this.onEtkinlikUpdate}/>

        <ReactDialog fields={this.katilimciDialogFields} title="Katılımcı Ekle" isOpen={this.state.addKatilimci} onClose={this.toggleAddKullanici}
                     onSubmit={this.onAddKatilimci} />
        <hr/>
                     {
          this.state.showKatilimci ?
          <KatilimciTable rows={this.state.krows}/> :
              null
        }


          {
              this.state.mapModal ?
                  <a href={this.state.temp1}target="_blank" style={{
                  color:"white",
                  fontSize:50}} onClick={this.toggleMap}> Haritada Göster</a> :
                  null
          }

      </div>
    );
  }


}

export default App;
