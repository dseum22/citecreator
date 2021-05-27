import React from 'react'

const CiteRow = (props) => {
    return (
        <>
            <div className='form-floating'>
                <input className='form-field' type='text' placeholder='Name' name='name' value={props.cite.name} onChange={props.onChange} required></input>
                <label>Name</label>
            </div>
            <div className='flex col-span-3'>
                <div className='form-floating flex-grow'>
                    <input className='form-field' type='text' placeholder='Quals' name='quals' value={props.cite.quals} onChange={props.onChange} required></input>
                    <label>Quals</label>
                </div>
                <div className='flex-shrink-0 ml-6'>
                    <button className='btn-classic h-14 w-14' type='button' onClick={props.onAdd}>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                        </svg>
                    </button>
                </div>
                <div className={`flex-shrink-0 ml-6 ${props.canDelete && !props.isFirst ? '' : 'hidden'}`}>
                    <button className='btn-classic h-14 w-14' type='button' onClick={props.onDelete}>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default CiteRow
