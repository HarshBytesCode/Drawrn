import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/canvas',
      permanent: false, // Set to true if you want a permanent redirect (HTTP 301)
    },
  };
};
export default function Home() {
  return null
}
