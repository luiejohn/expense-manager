import React from 'react'

import style from './Modal.module.scss'
import svgIcon from '../../../assets/icons/sprite.svg'

const Modal = (props) => {


    return (
        <div className={style.backdrop} style={ props.isModal ? null : {display: 'none'}}>
            <div className={style.modal_container}>
                <div className={style.modal_head}>
                    <div className={style.close_modal} onClick={props.handleModal}>
                        <svg>
                            <use xlinkHref={`${svgIcon}#icon-cross`}></use>
                        </svg>
                    </div>
                    <div>
                        Add New Item
                    </div>
                    <hr />
                </div>
                <div className={style.modal_main}>
                    { props.children}
                </div>
                <div className={style.modal_footer}>
                    <div className={style.modal_footer_btn} onClick={props.handleAddExpense}>
                        Create
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal