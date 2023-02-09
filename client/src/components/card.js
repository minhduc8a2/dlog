export default function MyCard(props) {
  let date = props.date.split("-");
  const year = date[0];
  const month = date[1];
  const day = date[2].slice(0, 2);
  date = day + "/" + month + "/" + year;
  return (
    <div className="mycard   mt-2 pt-2  px-3 px-lg-0 " >
      <div className="mycard-img rounded-more">
        <img src={props.image} alt=""  />
        <button className="btn bg-white rounded-more d-none">
          Xem bài viết
        </button>
      </div>

      <div className="mycard-body">
        <div className="d-flex align-items-center flex-wrap">
          <h5
            className="mycard-topic text-white rounded-more"
            style={{ backgroundColor: props.color }}
          >
            {props.tag}
          </h5>
          <h6 className="mycard-date ">{date}</h6>
        </div>

        <h4 className="mycard-title">{props.title}</h4>
      </div>
    </div>
  );
}
