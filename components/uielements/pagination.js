import { Pagination } from 'antd';
import AntPagination from './styles/pagination.style';
import WithDirection from 'utils/helpers/rtl';
const Paginations = AntPagination(Pagination);
const isoPagination = WithDirection(Paginations);

export default isoPagination;
