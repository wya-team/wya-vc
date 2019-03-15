import './src/css/elm.css';
import './src/css/reset.scss';
import Table from './src/table.vue';
import TableColumn from './src/table-column';
import TableItem from './src/table-item';

Table.Column = TableColumn;
Table.Item = TableItem;
export default Table;