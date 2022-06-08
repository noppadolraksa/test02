import Head from 'next/head';
import Image from 'next/image';
import Pages from '../layout/pageMain';

export default function Home(props) {
  return (
    <Pages
      route={props.route}
      title="Homepage"
      description="home"
      images=""
      // images="/static/images/logo.png"
      keywords=""
      // login={props.handleLoginShow}
      // register={props.handleRegisterShow}
      titleName={'หน้าหลัก'}
    >
      <div>
        <h1>Welcome To Next.js</h1>
      </div>
    </Pages>
  );
}
