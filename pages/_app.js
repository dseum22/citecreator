import '../styles/globals.css'
import Head from 'next/head'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/ico" href="/favicon.ico"></link>
                <title>Cite Creator</title>
                <meta name="author" content="Dennis Eum"></meta>
                <meta name="description" content="Creates cites and entries for debate evidence. Built with Next and Tailwind."></meta>
            </Head>
            <div className="flex flex-col justify-between min-h-screen">
                <main>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default MyApp
