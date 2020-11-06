import React, { createRef } from 'react'
import { Button } from './index'
// import styled from 'styled-components';
// Style the Button component
// const Button = styled.button`
//   /* Insert your favorite CSS code to style a button */
// `;
const FileUploader = props => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = createRef<HTMLInputElement>()
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    const node = hiddenFileInput.current
    if (node) {
        node.click()
    }
  }

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0]
    props.handleFile(fileUploaded)
  }
  return (
    <>
      <Button type="button" onClick={handleClick}>{props.children}</Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </>
  )
}
export default FileUploader