import React from 'react'

import Head from 'next/head'
import styles from '../styles/Home.module.css'

class Home extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      loaded: false,
      working: false,
      sentHeaders: {
        'X-Client-Data': 'test'
      },
      recievedHeaders: {}
    }
  }

  componentDidMount() {
    const { sentHeaders } = this.state

    const req = new Request('api/echoheaders', {
      method: 'GET',
      headers: sentHeaders,
    });

    fetch(req)
      .then(response => response.json())
      .then(data => {
         console.log('Headers:', data.headers);
         this.setState({ loaded: true, working: data.headers && !data.headers['x-client-data'], recievedHeaders: data.headers || {} })
      })
  }

  render() {
    const { loaded, working, sentHeaders, recievedHeaders } = this.state
    return (
      <div className={styles.container}>
        <Head>
          <title>Ghostery - Is BeyondCognito working?</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Is <span className={styles.titleName}>BeyondCognito</span> working?
          </h1>

          {!loaded && (
            <p className={styles.loading}>
            loading...
            </p>
          )}
          {loaded && working && (
            <p className={styles.yes}>
            Yes!
            </p>
          )}
          {loaded && !working && (
            <p className={styles.no}>
              No
            </p>
          )}
          <a href="https://www.ghostery.com/midnight/">Learn More</a>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Headers Sent:</h3>
              <div className={styles.code}>
                  {JSON.stringify(sentHeaders, null, "\t")}
              </div>
            </div>
            <div className={styles.card}>
              <h3>Headers Recieved:</h3>
              <div className={styles.code}>
              {loaded
                ? JSON.stringify(recievedHeaders, null, "\t")
                : 'loading...'
              }
              </div>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://ghostery.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with 💖 by{' '}
            <img src="/ghostery.svg" alt="Ghostery Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    )
  }
}


export default Home