import React, { useEffect, useRef, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import CiteRow from '../components/CiteRow'

const Home = () => {
    const formRef = useRef(null)
    const [success, setSuccess] = useState(false)
    const [article, setArticle] = useState({
        date: '',
        title: '',
        link: ''
    })
    const [authors, setAuthors] = useState([
        {
            name: '',
            quals: ''
        }
    ])
    const [citation, setCitation] = useState('')
    const [validityToggle, setValidityToggle] = useState(false)
    const [copyToggle, setCopyToggle] = useState(false)
    useEffect(() => formatChange(article, authors), [article, authors])
    useEffect(() => {
        if (copyToggle) {
            setTimeout(() => setCopyToggle(false), 750)
        }
    }, [copyToggle])
    useEffect(() => {
        if (success) {
            setTimeout(() => setSuccess(false), 2500)
        }
    }, [success])
    const handleArticleChange = e => setArticle(article => ({
        ...article,
        [e.target.name]: e.target.value
    }))
    const handleCitesChange = (e, index) => setAuthors(authors => ([
        ...authors.slice(0, index),
        {
            ...authors[0],
            [e.target.name]: e.target.value
        },
        ...authors.slice(index + 1)
    ]))
    const formatChange = (article, authors) => {
        let simpleSection;
        if (authors.length === 1) {
            simpleSection = authors[0].name.trim().split(' ').pop()
        } else if (authors.length === 2) {
            simpleSection = `${authors[0].name.trim().split(' ').pop()} and ${authors[1].name.trim().split(' ').pop()}`
        } else {
            simpleSection = `${authors[0].name.trim().split(' ').pop()} et al.`
        }
        return setCitation(`${simpleSection} ${article.date.trim() === '' ? 'No Date' : article.date.slice(-2)} (${authors.map(author => `${author.name}: ${author.quals.trim().slice(-1) === '.' ? author.quals.trim().slice(0, -1) : author.quals.trim()}. `)}'${article.title.trim()},' ${article.date.trim() === '' ? 'No Date' : article.date.trim().slice(-2)}, ${article.link.trim()}. DOA: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}) ${localStorage.getItem('initials')}`)
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (formRef.current.checkValidity()) {
            setValidityToggle(false)
            fetch(atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J5TUFmS0N2NHN6RHZmYm5pQjlnemdPSWxELU9rZGlxMUZxQzlEX1pzTktQQkNGZDdjU3ljX3BFUmFqRUs5MVBfN3plQS9leGVj'), {
                method: 'POST',
                mode: 'no-cors',
                credentials: 'include',
                body: JSON.stringify({
                    authors: authors,
                    date: article.date === '' ? 'No Date' : article.date,
                    title: article.title,
                    link: article.link,
                    meta: {
                        link: localStorage.getItem('link'),
                        name: localStorage.getItem('name'),
                        date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
                    }
                })
            }).then(() => setSuccess(true)).catch(error => alert(error))
        } else {
            setValidityToggle(true)
        }
    }
    const handleCopy = () => navigator.clipboard.writeText(citation).then(() => setCopyToggle(true))
    const resetCitation = () => {
        setArticle({
            date: '',
            title: '',
            link: ''
        })
        setAuthors([
            {
                name: '',
                quals: ''
            }
        ])
        setValidityToggle(false)
    }
    if (!localStorage.getItem('initials')) {
        return <Redirect to='/settings' />
    }
    return (
        <>
            <div>
                <header className='flex justify-between mt-4 md:mt-6'>
                    <div className='flex'>
                        <div className='rounded-md shadow-md bg-gray-800 text-white h-14 px-3 text-xl sm:text-2xl font-bold mr-3 select-none flex items-center'>
                            <h1>Cite Creator</h1>
                        </div>
                        <Link className='btn-classic h-14 w-14' to='/settings'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                            </svg>
                        </Link>
                        <div className={`flex items-center text-white px-4 border-0 rounded-md bg-gray-800 h-14 ml-3 transition-opacity duration-400 ${success ? 'opacity-100' : 'opacity-0'}`}>
                            <span className='inline-block align-middle select-none'>Successfully logged article!</span>
                        </div>
                    </div>
                    <div className='flex'>
                        <button className='btn-classic h-14 w-14' type='button' onClick={resetCitation}>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                            </svg>
                        </button>
                        <button className='btn-classic h-14 w-14 ml-3' type='button' onClick={() => formRef.current.requestSubmit()}>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                        </button>
                    </div>
                </header>
                <form className={`mt-6 ${validityToggle ? 'form-validate' : ''}`} ref={formRef} onSubmit={handleSubmit} noValidate>
                    <h2 className='text-xl mb-1'>Article</h2>
                    <div className='grid grid-cols-5 gap-6'>
                        <div className='form-floating'>
                            <input className='form-field' type='text' placeholder='Date' name='date' value={article.date} onChange={handleArticleChange} required></input>
                            <label>Date</label>
                        </div>
                        <div className='form-floating col-span-2'>
                            <input className='form-field' type='text' placeholder='Title' name='title' value={article.title} onChange={handleArticleChange} required></input>
                            <label>Title</label>
                        </div>
                        <div className='form-floating col-span-2'>
                            <input className='form-field' type='text' placeholder='Link' name='link' value={article.link} onChange={handleArticleChange} required></input>
                            <label>Link</label>
                        </div>
                    </div>
                    <h2 className='text-xl mt-4 mb-1'>Author{authors.length === 1 ? '' : 's'}</h2>
                    <div className='grid grid-cols-4 gap-6'>
                        {authors.map((cite, index) => (
                            <CiteRow key={index} cite={cite} onChange={e => handleCitesChange(e, index)} onAdd={() => setAuthors([...authors.slice(0, index + 1), { name: '', quals: '' }, ...authors.slice(index + 1)])} onDelete={() => setAuthors(authors.filter((inCite, inIndex) => inIndex !== index))} canDelete={authors.length !== 1} isFirst={index === 0} />
                        ))}
                    </div>
                </form>
            </div>
            <div className='relative mt-6'>
                <textarea className='form-field' value={citation} disabled={true}>
                </textarea>
                <button className='absolute bottom-3 right-3 rounded-md shadow-md bg-gray-800 hover:bg-gray-700 text-white hover:text-gray-200 py-1 px-2 transition-colors duration-200 focus:outline-none select-none' type='button' onClick={handleCopy}>{copyToggle ? 'Copied' : 'Copy'}</button>
            </div>
        </>
    )
}

export default Home
