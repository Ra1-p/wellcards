import CustomButton from "../../components/CustomButton";
import "./NotFoundPage.scss";

export default function NotFoundPage() {
  return (
    <div className='not-found'>
      <div className='not-found__body'>
        <div className='not-found__title'>404</div>
        <div className='not-found__subtitle'>This page does not exist</div>
        <div className='not-found__text'>
          Check the URL or return to the home page.
        </div>
        <CustomButton type = "link" to = "/" background='filled' size='big'>
          Return
        </CustomButton>
      </div>
    </div>
  );
}
