import React from 'react';
import {styled} from '@mui/material/styles';
import {
  FormControl,
  Button,
  ButtonGroup,
  Stack,
  TextField,
} from '@mui/material';

const buttonPos = {
  left: '5%',
};

const Input = styled('input')({
  display: 'none',
});
const UploadButton = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
        />
        <ButtonGroup style={{padding: '10px'}}>
          <Button variant="contained" component="span">
            Upload
          </Button>

          <Button type="submit" color="secondary" style={buttonPos}>
            Post
          </Button>
        </ButtonGroup>
      </label>
    </Stack>
  );
};

export default function CreateMeme() {
  return (
    <FormControl fullWidth sx={{m: 0.9}} variant="standard">
      <TextField
        id="outlined-multiline-static"
        label="create Meme"
        multiline
        rows={7}
        variant="filled"
      />

      <UploadButton />
    </FormControl>
  );
}
