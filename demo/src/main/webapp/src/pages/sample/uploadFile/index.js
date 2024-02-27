import React, { useState, useEffect } from "react";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import FolderIcon from '@mui/icons-material/Folder';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function generate(element: React.ReactElement, items) {
  console.log(element.props.children[1].props);
  const { primary } = element.props.children[1].props;
  console.log(primary);

  let ele;
  if (items.length > 0) {
    ele = items.map((value, idx) =>
                        <ListItem key={ idx }>
                          <ListItemIcon>
                            <UploadFileIcon />
                          </ListItemIcon>
                          <Link href={value}>{value}</Link>
                        </ListItem>
                    );
  }
  else{
    ele =
        <ListItem key="1">
          <ListItemText
              primary="No Data"
            />
        </ListItem>
  }

  console.log(ele);

  return ele;

//  return items.map((value) => {
//    const { primary } = element.props.children[1].props;
//    React.cloneElement(element, {
//      key: value,
//      primary : value,
//    })
//  });
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Main() {
    const [files, setFiles] = useState([]);
    const [listFiles, setListFiles] = useState([]);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const handleFilesChange = (e) => {
        setFiles(Array.from(e.target.files));
    }

    const uploadFiles = (e) => {
        e.preventDefault();
        const formData = new FormData();

        files.map((file) => {
          formData.append("files", file);
        });

        console.log(Array.from(formData));

        axios.post('/api/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
            console.log(res.data);
            loadAllFiles();
        }).catch((err) => {
            console.error(err);
        });
    }

    const loadAllFiles = async () => {
        try {
            const response = await axios.get(
                'api/file/all'
            );

            console.log(response.data);

            setListFiles(response.data.files);
        }
        catch(e){
            console.log(e.message);
        }

    };

    useEffect(() => {
        loadAllFiles();
    }, []);

    return(
        <>
            <Container maxwidth="sm">
                <h1>Sample Upload files!</h1>
                <Box display="flex"
                     alignItems="center"
                     gap={4}
                >
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 4, sm: 1, md: 6 }}>
                        <Grid item xs={6}>
                            <Item>
                                <Typography variant="h4" gutterBottom>
                                    Upload File
                                </Typography>
                                <form>
                                    <input
                                        className='file-input'
                                        type="file"
                                        multiple
                                        onChange={handleFilesChange}
                                    />
                                    <button onClick={uploadFiles}>upload</button>
                                </form>
                            </Item>
                        </Grid>
                        <Grid item xs={8}>
                            <Item>
                                <Typography variant="h4" gutterBottom>
                                    File List
                                </Typography>
                                <List dense={dense}>
                                  {generate(
                                    <ListItem>
                                      <ListItemIcon>
                                        <FolderIcon />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary="Single-line item"
                                        secondary={secondary ? "secondary" : null}
                                      />
                                    </ListItem>, listFiles
                                  )}
                                </List>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}