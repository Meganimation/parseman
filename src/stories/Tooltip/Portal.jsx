import ReactDom from 'react-dom';

function Portal(props) {
    return ReactDom.createPortal(props.children, document.body);
}

export default Portal;