import { useState } from 'react';
import { useModal } from '@/hooks/useModal';
import ModalWrapper from '@/components/ModalWrapper';
import { Menu, MenuItem, Typography } from '@mui/material';

import CreateLink from './CreateLink';

interface Props {
	open: boolean;
	documentId: number;
	onClose: () => void;
	anchorEl: HTMLElement | null;
	onDelete: (documentId: number) => void;
}

const ActionMenu = ({ anchorEl, open, onClose, documentId, onDelete }: Props) => {
	const deleteModal = useModal();
	const updateModal = useModal();

	const [openLink, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
	};

	return (
		<>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={onClose}
				disableScrollLock={true}
				sx={{
					'& .MuiPaper-root': {
						boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
						borderRadius: '4px',
					},
				}}>
				<MenuItem onClick={handleClickOpen}>Add new link</MenuItem>
				<MenuItem onClick={onClose}>Duplicate document</MenuItem>
				<MenuItem onClick={updateModal.openModal}>Update document</MenuItem>
				<MenuItem onClick={onClose}>View analytics</MenuItem>
				<MenuItem onClick={deleteModal.openModal}>
					<Typography color="error">Delete</Typography>
				</MenuItem>
			</Menu>

			<CreateLink open={openLink} onClose={handleClose} />

			<ModalWrapper
				variant="delete"
				title="Really delete this file?"
				description="When you delete this file, all the links associated with the file will also be removed. This action is non-reversible."
				confirmButtonText="Delete file"
				open={deleteModal.isOpen}
				toggleModal={deleteModal.closeModal}
				onClose={() => {
					onDelete(documentId);
				}}
			/>

			<ModalWrapper
				variant="upload"
				title="Update with a new document"
				description="When you update with a new document, the current link won’t change."
				confirmButtonText="Update"
				open={updateModal.isOpen}
				toggleModal={updateModal.closeModal}
				onClose={function (): void {
					throw new Error('Function not implemented.');
				}}
			/>
		</>
	);
};

export default ActionMenu;
