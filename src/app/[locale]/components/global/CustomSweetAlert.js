"use client";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from 'react';

const MySwal = withReactContent(Swal);

export const AllertSwal = ({ title, text, canceltext, deletetext }) => {
    return MySwal.fire({
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: false,
        backdrop: `rgba(0, 0, 0, 0.5);`,
        icon: "warning",
        allowOutsideClick: false,
        html: (
            <div className='customSweetAlert'>
                <h1 className='customSweetAlert__title'>{title}</h1>
                <p className='customSweetAlert__text'>{text}</p>
                <div className='customSweetAlert__buttonWrapper'>
                    <button
                        onClick={() => MySwal.clickCancel()}
                        className='customSweetAlert__cancel'
                    >
                        {canceltext}
                    </button>
                    <button
                        onClick={() => MySwal.clickConfirm()}
                        className='customSweetAlert__delete'>
                        {deletetext}
                    </button>
                </div>

            </div>
        )
    })
}


export const ConfirmSwal = ({ title, text, canceltext, confirmtext }) => {
    return MySwal.fire({
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: false,
        backdrop: `rgba(0, 0, 0, 0.5);`,
        icon: "warning",
        allowOutsideClick: false,
        html: (
            <div className='customSweetAlert'>
                <h1 className='customSweetAlert__title'>{title}</h1>
                <p className='customSweetAlert__text'>{text}</p>
                <div className='customSweetAlert__buttonWrapper'>
                    <button
                        onClick={() => MySwal.clickCancel()}
                        className='customSweetAlert__cancel'>
                        {canceltext}
                    </button>
                    <button
                        onClick={() => MySwal.clickConfirm()}
                        className='customSweetAlert__confirm'>
                        {confirmtext}
                    </button>
                </div>

            </div>
        )
    })
}

export const QuestionSwal = ({ title, text, canceltext, confirmtext }) => {
    return MySwal.fire({
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: false,
        backdrop: `rgba(0, 0, 0, 0.5);`,
        icon: "question",
        allowOutsideClick: false,
        html: (
            <div className='customSweetAlert'>
                <h1 className='customSweetAlert__title'>{title}</h1>
                <p className='customSweetAlert__text'>{text}</p>
                <div className='customSweetAlert__buttonWrapper'>
                    <button
                        onClick={() => MySwal.clickCancel()}
                        className='customSweetAlert__cancel'>
                        {canceltext}
                    </button>
                    <button
                        onClick={() => MySwal.clickConfirm()}
                        className='customSweetAlert__confirm'>
                        {confirmtext}
                    </button>
                </div>

            </div>
        )
    })
}