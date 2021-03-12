import { GetServerSidePropsContext } from 'next'

const Empty = ({}: IProps) => {
  return (
    <div style={{ padding: 50 }}>
      <>
        <h2>Omnea: Bad Hostname</h2>
        <br />
        Please visit this website via:
        <br />
        <ul>
          <li>
            <a href="http://omnea.local:3000">http://omnea.local:3000</a>
          </li>
          <li>
            <a href="http://admin.omnea.local:3000">http://admin.omnea.local:3000</a>
          </li>
          <li>
            <a href="http://docs.omnea.local:3000">http://docs.omnea.local:3000</a>
          </li>
        </ul>
        <hr />
        <br />
        <h3>Change your /etc/hosts file to this..</h3>
        <div style={{ backgroundColor: 'antiquewhite', fontFamily: 'monospace', padding: 40, margin: 20 }}>
          # Host Database <br />
          # localhost is used to configure the loopback interface <br />
          # when the system is booting. Do not change this entry. <br />
          <br />
          127.0.0.1 localhost omnea.local admin.omnea.local docs.omnea.local api.omnea.local <br />
          255.255.255.255 broadcasthost <br />
          ::1 localhost <br />
          # End of section
          <br />
        </div>
        See README.md for info
      </>
    </div>
  )
}

export async function getServerSideProps({ params, locale, req, res }: GetServerSidePropsContext) {
  return {
    props: {},
    redirect: {
      destination: '/_root_',
      permanent: false,
    },
  }
}

export default Empty

interface IProps {}
