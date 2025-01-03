import { Document } from '@/utils/shared/models';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { TableCell, TableRow, TableSortLabel } from '@mui/material';

interface Props {
	orderBy: keyof Document | undefined;
	orderDirection: 'asc' | 'desc' | undefined;
	onSort: (property: keyof Document) => void;
}

const DocumentsTableHeader = ({ orderBy, orderDirection, onSort }: Props) => (
	<TableRow>
		<TableCell sx={{ width: '5%' }}></TableCell>
		<TableCell sx={{ width: '45%' }}>DOCUMENT</TableCell>
		<TableCell sx={{ pl: '1.5rem', width: '20%' }}>
			<TableSortLabel
				active={orderBy === 'uploader'}
				direction={orderDirection}
				onClick={() => onSort('uploader')}
				hideSortIcon={false}
				IconComponent={orderDirection === undefined ? UnfoldMoreIcon : KeyboardArrowDownIcon}>
				UPLOADER
			</TableSortLabel>
		</TableCell>
		<TableCell sx={{ pl: '1.5rem', width: '15%' }}>ANALYTICS</TableCell>
		<TableCell sx={{ pl: '1.5rem', width: '10%' }}>LINK</TableCell>
		<TableCell sx={{ width: '5%' }}>ACTION</TableCell>
	</TableRow>
);

export default DocumentsTableHeader;
