import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import {TablePageController} from "./TablePageController";

export default class PaginationTable extends Component {


  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      rows: []
    };
  }

  columns = [
    {id: "showKatilimci", label: "Katılımcıları Göster", align: "right", onClick: this.props.onShowKatilimci},
    {id: 'etkinlikAdi', label: 'Etkinlik Adı', align: 'right'},
    {id: 'startDate', label: 'Başlangıç Tarihi',  align: 'right'},
    {id: 'endDate', label: 'Bitiş Tarihi',  align: 'right'},
    {id: "kota", label: "Kapasite", align: "right",},
    {id: "konum", label: "Konum", align: "right"},
    {id: "update", label: "Etkinliği Güncelle", align: "right", onClick: this.props.onUpdate},
    {id: "delete", label: "Etkinliği Sil", align: "right", onClick: this.props.onDelete},
    {id: "addKatilimci", label: "Katılımcı Ekle", align: "right", onClick: this.props.onAddKatilimci},
    {id: "map", label: "Haritada Göster", align: "right", onClick: this.props.onMap},

  ];

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0
    });
  };


  render() {
    return (
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHeader columns={this.columns}/>
            <TableContent rows={this.props.rows} page={this.state.page} rowsPerPage={this.state.rowsPerPage}
                          columns={this.columns}/>
          </Table>
        </TableContainer>
        <TablePageController count={this.state.rows.length}
                             rowsPerPage={this.state.rowsPerPage}
                             page={this.state.page} handleChangePage={this.handleChangePage}
                             handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
      </Paper>
    );
  }


}
