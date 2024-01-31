import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import Avatar from "../../images/avatar.png";
import FooterAlt from "../Layouts/footer-alt";
import Header from "../Layouts/header";
// import Masonry from "react-masonry-css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import StarRatings from "react-star-ratings/build/star-ratings";
// import "./review.scss";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true });
  }
  componentDidMount() {
    document.body.classList = "";
    window.addEventListener("scroll", this.scrollNavigation, true);
    //   Waves.init();
  }

  scrollNavigation = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 80) {
      document.getElementById("nav-bar").classList.add("sticky-dark");
      document.getElementById("is-sticky").classList.add("is-sticky");
    } else {
      document.getElementById("nav-bar").classList.remove("sticky-dark");
      document.getElementById("is-sticky").classList.remove("is-sticky");
    }
  };
  render() {
    var items = [
      {
        id: 1,
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        rating: 5,
      },
      {
        id: 2,
        review:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source",
        rating: 3,
      },
      {
        id: 3,
        review:
          " It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        rating: 4,
      },
      { id: 4, review: "Here is the Fourth", rating: 5 },
      {
        id: 5,
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        rating: 1,
      },
      {
        id: 6,
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        rating: 3,
      },
      {
        id: 7,
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        rating: 5,
      },
      { id: 8, review: "Third Item", rating: 4 },
      { id: 9, review: "Here is the Fourth", rating: 3 },
      { id: 10, review: "High Five", rating: 5 },
    ];

    // Convert array to JSX items
    // items = items.map(function (item) {
    //   return (
    //     <div key={item.id}>
    //       {" "}
    //       <div
    //         className="review_card shadow-lg p-5 bg-white"
    //         style={{
    //           marginBottom: "6rem",
    //           borderRadius: 10,
    //         }}
    //       >
    //         <div className="review_card_img">
    //           <div
    //             className="row"
    //             style={{
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <div className="col-md-2">
    //               <img
    //                 src={Avatar}
    //                 className="img-fluid rounded-circle"
    //                 alt="user"
    //               />
    //             </div>
    //             <div className="col-md-10">
    //               <div
    //                 className="content"
    //                 style={{
    //                   display: "flex",
    //                   flexDirection: "column",
    //                   justifyContent: "center",
    //                   alignItems: "center",
    //                 }}
    //               >
    //                 <p>
    //                   Lorem Ipsum is simply dummy text of the printing and
    //                   typesetting industry. Lorem Ipsum has been the industry's
    //                   standard dummy text ever since the 1500s, when an unknown
    //                   printer took a galley of type and scrambled it to make a
    //                   type specimen book. It has survived not only five
    //                   centuries, but also the leap into electronic typesetting,
    //                   remaining essentially unchanged.
    //                 </p>

    //                 <p style={{ marginBottom: 0 }}>
    //                   <strong>STRUGATSKY BROTHERS</strong>
    //                 </p>
    //                 <p>
    //                   <em>Hard to Be a God</em>
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
    return (
      <Fragment>
        <Header />
        <section
          className="section bg-home home-half review_card_container"
          id="reviews"
          style={{
            marginTop: 100,
            background: "#e2e5ee",
          }}
        >
          <div className="container-fluid">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry>
                {items.map((item, index) => {
                  return (
                    <div key={item.id}>
                      {" "}
                      <div
                        className="review_card bg-white"
                        style={{
                          // marginBottom: "6rem",
                          margin: "1rem 1rem 3rem 1rem",
                          borderRadius: 10,
                          border: "solid 1px #eee",
                          position: "relative",
                          padding: "3rem 1rem",
                        }}
                      >
                        <div className="review_card_img">
                          <div
                            className="row"
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              className="col-md-2"
                              style={{
                                position: "absolute",
                                top: "-37px",
                              }}
                            >
                              <img
                                src={Avatar}
                                className="img-fluid rounded-circle"
                                alt="user"
                              />
                            </div>
                            <div className="col-md-10">
                              <div
                                className="content"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                <p>{item.review}</p>
                                <StarRatings
                                  rating={item.rating}
                                  starRatedColor="#f7bf50"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension={"20px"}
                                />
                                <p
                                  style={{ marginBottom: 0, marginTop: "1rem" }}
                                >
                                  <strong>STRUGATSKY BROTHERS</strong>
                                </p>
                                <p>
                                  <em>Hard to Be a God</em>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
          {/* <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {items}
          </Masonry> */}
          {/* <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="review_card shadow-lg p-5 bg-white"
                  style={{
                    marginBottom: "6rem",
                    borderRadius: 10,
                  }}
                >
                  <div className="review_card_img">
                    <div
                      className="row"
                      style={{
                        justifyContent: "center",
                        alignItems: "end",
                      }}
                    >
                      <div className="col-md-2">
                        <img
                          src={Avatar}
                          className="img-fluid rounded-circle"
                          alt="user"
                        />
                      </div>
                      <div className="col-md-10">
                        <div
                          className="content"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                          </p>

                          <p style={{ marginBottom: 0 }}>
                            <strong>STRUGATSKY BROTHERS</strong>
                          </p>
                          <p>
                            <em>Hard to Be a God</em>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="review_card shadow-lg p-5 bg-whit"
                  style={{
                    marginBottom: "6rem",
                    borderRadius: 10,
                  }}
                >
                  <div className="review_card_img">
                    <div
                      className="row"
                      style={{
                        justifyContent: "center",
                        alignItems: "end",
                      }}
                    >
                      <div className="col-md-10">
                        <div
                          className="content"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                          </p>

                          <p style={{ marginBottom: 0 }}>
                            <strong>STRUGATSKY BROTHERS</strong>
                          </p>
                          <p>
                            <em>Hard to Be a God</em>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <img
                          src={Avatar}
                          className="img-fluid rounded-circle"
                          alt="user"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="review_card shadow-lg p-5 bg-white"
                  style={{
                    marginBottom: "6rem",
                    borderRadius: 10,
                  }}
                >
                  <div className="review_card_img">
                    <div
                      className="row"
                      style={{
                        justifyContent: "center",
                        alignItems: "end",
                      }}
                    >
                      <div className="col-md-2">
                        <img
                          src={Avatar}
                          className="img-fluid rounded-circle"
                          alt="user"
                        />
                      </div>
                      <div className="col-md-10">
                        <div
                          className="content"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                          </p>

                          <p style={{ marginBottom: 0 }}>
                            <strong>STRUGATSKY BROTHERS</strong>
                          </p>
                          <p>
                            <em>Hard to Be a God</em>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="review_card shadow-lg p-5 bg-whit"
                  style={{
                    marginBottom: "6rem",
                    borderRadius: 10,
                  }}
                >
                  <div className="review_card_img">
                    <div
                      className="row"
                      style={{
                        justifyContent: "center",
                        alignItems: "end",
                      }}
                    >
                      <div className="col-md-10">
                        <div
                          className="content"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                          </p>

                          <p style={{ marginBottom: 0 }}>
                            <strong>STRUGATSKY BROTHERS</strong>
                          </p>
                          <p>
                            <em>Hard to Be a God</em>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <img
                          src={Avatar}
                          className="img-fluid rounded-circle"
                          alt="user"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </section>
        <FooterAlt />
      </Fragment>
    );
  }
}

export default Review;
