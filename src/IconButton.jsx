import './IconButton.css';

function IconButton({iconSrc, label}){
    return (
        <>
            <div className="icon-button">
                {iconSrc && <img src={iconSrc} alt="" />} 
                {label && label}
            </div>
        </>
    );
}

export {IconButton};