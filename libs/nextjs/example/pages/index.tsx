const FallbackPage = () => {
  return <div></div>
}

export function getServerSideProps() {
  return {
    props: {},
    redirect: {
      destination: '/live',
      permanent: false
    }
  }
}

export default FallbackPage
