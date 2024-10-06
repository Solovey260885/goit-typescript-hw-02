import { BallTriangle } from "react-loader-spinner";
import css from "../Loader/Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#916afa"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass={css.loader}
        visible={true}
      />
    </div>
  );
};

export default Loader;
