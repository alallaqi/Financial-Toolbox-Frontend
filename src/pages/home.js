import Header from '../components/Header';
import ToolCards from '../components/ToolCards';

export default function Home() {
  return (
    <div>
      <Header isRestricted={false}/>
      <ToolCards showFooter={false} />
    </div>
  );
}
