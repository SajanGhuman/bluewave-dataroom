import useFileInfo from '@/hooks/useFileInfo';
import { useToast } from '@/hooks/useToast';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface CustomUploaderProps {
	fileFormats?: string;
	fileInfo: { name: string; size: string; type: string };
	handleFileInfo: React.Dispatch<
		React.SetStateAction<{ name: string; size: string; type: string }>
	>;
}

export default function CustomUploader({
	fileFormats,
	fileInfo,
	handleFileInfo,
}: CustomUploaderProps) {
	const [uploading, setUploading] = useState(false);
	const { data: session } = useSession();
	const { showToast } = useToast();
	const { formatFileSize } = useFileInfo();

	const handleUploadFile = () => {
		console.log('Files Uploaded Successfully!');
		showToast({
			message: 'Files Uploaded Successfully!',
			variant: 'success',
		});
	};

	const handleFailedFileError = () => {
		console.log('File Uploading Failed!');
		showToast({
			message: 'File Uploading Failed!',
			variant: 'error',
		});
	};

	const handleSizeFileError = () => {
		console.log('One or more files exceed the 1MB size limit.');
		showToast({
			message: 'One or more files exceed the 1MB size limit.',
			variant: 'error',
		});
	};

	const handleLimitFileError = () => {
		console.log('One or more files exceed the undefined size limit.');
		showToast({
			message: 'One or more files exceed the undefined size limit.',
			variant: 'error',
		});
	};

	const handleNotAuthenticatedError = () => {
		console.log('User not authenticated!');
		showToast({
			message: 'User not authenticated!',
			variant: 'error',
		});
	};

	// Handle file selection
	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files && files.length > 0) {
			console.log('Files selected:', files); // Log the selected files

			const fileSizeEnv = process.env.FILE_SIZE;
			console.log(process.env);
			console.log(fileSizeEnv);
			const maxFileSize = 1 * 1024 * 1024;

			//const maxFileSize = Number(fileSizeEnv) * 1024 * 1024;
			//console.log(maxFileSize);

			// Check if the number of files exceeds 5 or any file exceeds 1MB
			if (files.length > 5) {
				console.error('You can upload a maximum of 5 files.');
				handleSizeFileError();
				return;
			}

			// Check each file's size to ensure it does not exceed 1MB
			const fileTooLarge = Array.from(files).some((file) => file.size > maxFileSize); // 1MB
			if (fileTooLarge) {
				console.error(`One or more files exceed the 5 size limit.`);
				handleLimitFileError();
				return;
			}

			setUploading(true);

			try {
				if (!session) {
					console.error('User not authenticated!');
					handleNotAuthenticatedError();
					setUploading(false);
					return;
				}

				const formData = new FormData();
				Array.from(files).forEach((file) => {
					formData.append('files', file); // Append each file to FormData
				});

				// Log the FormData to ensure files are being appended
				console.log('FormData:', formData);

				const response = await axios.post('/api/documents/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data', // Ensure proper content type
					},
				});

				if (response?.status === 200 && response.data?.documents) {
					handleUploadFile();
				} else {
					handleFailedFileError();
				}
			} catch (error: any) {
				const errorMessage =
					error.response?.data?.error || error.message || 'Unexpected error occurred';
				console.error('Error uploading files:', errorMessage, error);
				handleFailedFileError();
			} finally {
				setUploading(false);
			}
		}
	};

	return (
		<Box display='flex'>
			<TextField
				value={fileInfo.name}
				size='small'
				fullWidth
				disabled
			/>
			<Button
				variant='outlined'
				color='inherit'
				size='small'
				sx={{
					borderColor: 'text.notes',
					ml: 10,
					fontSize: 13,
					minWidth: '6rem',
				}}
				onClick={() => document.getElementById('file-input')?.click()}>
				Browse
			</Button>
			<input
				type='file'
				id='file-input'
				accept={fileFormats === 'JPG, PNG' ? 'image/*' : 'application/pdf'}
				style={{ display: 'none' }}
				onChange={handleFileSelect}
				multiple // Allow multiple files
			/>
		</Box>
	);
}
