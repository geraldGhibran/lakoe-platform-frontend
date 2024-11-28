import Carousel from '../components/Carousel';
import NavComponent from '../components/nav-component';
// import StatsTitleDescription from '../components/DetailProduct';
import DetailProduct from '../components/DetailProduct';

export default function MarketplaceHomePage() {
  return (
    <>
      <NavComponent />
      <Carousel />
      <DetailProduct />
    </>
  );
}
