import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

const Settings = () => {
    const router = useRouter()
    const formRef = useRef(null)
    const [validityToggle, setValidityToggle] = useState(false)
    const [data, setData] = useState({
        initials: '',
        name: '',
        link: ''
    })
    useEffect(() => {
        if (localStorage.getItem('initials')) setData({
            initials: localStorage.getItem('initials'),
            name: localStorage.getItem('name'),
            link: localStorage.getItem('link')
        })
    }, [])
    const handleChange = e => setData(data => ({
        ...data,
        [e.target.name]: e.target.value
    }))
    const handleSubmit = e => {
        e.preventDefault()
        if (formRef.current.checkValidity()) {
            setValidityToggle(false)
            localStorage.setItem('initials', data.initials.trim())
            localStorage.setItem('name', data.name.trim())
            localStorage.setItem('link', data.link.trim())
            router.push('/')
        } else {
            setValidityToggle(true)
        }
    }
    return (
        <>
            <Head>
                <link rel="canonical" href="https://citecreator.netlify.app/settings"></link>
                <meta name="robots" content="none"></meta>
            </Head>
            <header className="flex justify-between mt-4 md:mt-6">
                <div className="flex">
                    <div className="rounded-md shadow-md bg-gray-800 text-white h-14 px-3 text-xl sm:text-2xl font-bold mr-3 select-none flex items-center">
                        <h1>Cite Creator</h1>
                    </div>
                    <Link href="/">
                        <a className="btn-classic h-14 w-14">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </a>
                    </Link>
                </div>
                <div className="flex">
                    <button className="btn-classic h-14 w-14" type="button" onClick={() => {
                        localStorage.clear()
                        setData({
                            initials: '',
                            name: '',
                            link: ''
                        })
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                    <button className="btn-classic h-14 w-14 ml-3" type="button" onClick={() => formRef.current.requestSubmit()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            </header>
            <form className={`mt-6 ${validityToggle ? 'form-validate' : ''}`} ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-5 gap-6">
                    <div className="form-floating col-span-2">
                        <input className="form-field" type="text" placeholder="Initials" name="initials" value={data.initials} onChange={handleChange} required></input>
                        <label>Initials</label>
                    </div>
                    <div className="form-floating col-span-3">
                        <input className="form-field" type="text" placeholder="Name" name="name" value={data.name} onChange={handleChange} required></input>
                        <label>Name</label>
                    </div>
                </div>
                <div className="form-floating mt-6">
                    <input className="form-field" type="url" placeholder="Link" name="link" value={data.link} onChange={handleChange} required></input>
                    <label>Link</label>
                </div>
            </form>
            <h2 className="text-xl mt-4">You must set initials, name, and a Google spreadsheet link to use Cite Creator.</h2>
        </>
    )
}

export default Settings
