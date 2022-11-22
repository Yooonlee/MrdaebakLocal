import ReactDOM from 'react-dom';
import React from "react";
import { Button, TopMenuButton } from "./Button";
import styled from 'styled-components';

const ModalLegend = styled.legend`
  font-size: 2.5rem;
  font-weight: bold;
`

const Modal = ({ show, content, onCloseButtonClick, subUrl, title }) => {

  if (!show) {
    return null;
  } else {
    window.history.replaceState(null, "", "./" + subUrl);
  }

  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <div className="modal">
        <div className="body">
          <fieldset>
            <ModalLegend>{title}</ModalLegend>
            {content}
          </fieldset>
          <br /><br /><br />
        </div>
              <div className="footer">
                  <Button onClick={onCloseButtonClick} title="닫기" />
        </div>
      </div>
    </div>
    , document.body
  );
};

export default Modal;
