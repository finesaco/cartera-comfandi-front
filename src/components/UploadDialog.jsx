import React, { useId } from 'react'
import {
  Dialog,
  Box,
  Typography,
  Button,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  tableCellClasses,
  styled,
  TableRow,
  TableBody
} from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { useFiles } from '@/hooks/useFiles'
import { ScreenLoader } from '@/components'
import { convertSimpleFileType } from '@/utils/strings'
import { convertTimestampToDate } from '@/utils/dates'
import { convertBytesToMb } from '@/utils/numbers'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey.A100
  }
}))

const UploadDialog = ({ open, close, url, title }) => {
  const { files, isLoading, loadFiles, removeFiles, uploadFile } = useFiles()
  const id = useId()
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      loadFiles(acceptedFiles)
    }
  })

  const handleClose = () => {
    close(false)
  }
  const handleSubmmit = () => {
    uploadFile(url)
  }

  if (isLoading) return <ScreenLoader />

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ padding: 3 }}>
        {files.length !== 0 ? (
          <Stack sx={{ overflow: 'hidden', p: 3, gap: 3 }}>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Typography variant='h6' color='neutral.500'>
                Has cargado {files.length} archivo
              </Typography>
            </Stack>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Archivo</StyledTableCell>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell>Tipo</StyledTableCell>
                    <StyledTableCell>Última modificación</StyledTableCell>
                    <StyledTableCell>Tamaño</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={`${id}-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{convertSimpleFileType(file.type)}</TableCell>
                      <TableCell>{convertTimestampToDate(file.lastModified)}</TableCell>
                      <TableCell>{convertBytesToMb(file.size)} Mb</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 2, mt: 2 }}>
              <Button onClick={handleSubmmit}>Subir archivo</Button>
              <Button variant='outlined' onClick={removeFiles}>
                Remover archivo
              </Button>
            </Stack>
          </Stack>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 2
              }}
            >
              <Typography variant='h5' color='neutral.500'>
                {' '}
                {title}
              </Typography>
            </Box>

            <Box
              {...getRootProps()}
              sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <input {...getInputProps()} />
              <Box textAlign='center' border='2px dashed #205CC1' sx={{ padding: 4, borderRadius: 2 }}>
                <Typography color={'black'} fontWeight='600'>
                  Arrastra y suelta el archivo o selecciona el archivo
                </Typography>
                <Typography color='neutral.400'>También puedes buscarlo en tus archivos</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2
              }}
            ></Box>
          </>
        )}
      </Box>
    </Dialog>
  )
}
export default UploadDialog
