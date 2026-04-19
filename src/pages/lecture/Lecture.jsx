import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../config";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { isValidId, getLectures } from "../../api/api";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (!isValidId(params.id)) {
      navigate("/error");
      return;
    }
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");
      return;
    }
    fetchLectures();
    fetchProgress();
  }, [user, params.id, navigate]);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) return null;

  async function fetchLectures() {
    try {
      const apiLectures = await getLectures(params.id);
      setLectures(apiLectures);
      setLoading(false);
      if (apiLectures.length > 0) {
        fetchLecture(apiLectures[0]._id);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const foundLecture = lectures.find((l) => l._id === id);
      if (foundLecture) {
        setLecture(foundLecture);
      }
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  async function fetchProgress() {
    try {
      const completed = lectLength > 0 ? Math.floor((completedLec / lectLength) * 100) : 0;
      setCompleted(completed);
      setLectLength(lectures.length || 0);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    setCompletedLec((prev) => prev + 1);
  };

  console.log(progress);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="progress">
            <span>Progress: {completedLec} / {lectLength} lectures completed ({completed}%)</span>
            <progress value={completed} max={100} style={{ width: "100%", height: "4px" }}></progress>
          </div>
          <div className="lecture-page">
            <div className="left">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <>
                      <div className="video-container">
                        <iframe
                          src={lecture.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={lecture.title}
                        ></iframe>
                      </div>
                      <div className="lecture-content">
                        <h2>{lecture.title}</h2>
                        <p>{lecture.description}</p>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: "40px", color: "var(--text-color)" }}>
                      <h1>Please Select a Lecture</h1>
                      <p style={{ opacity: 0.7 }}>Click on a lecture from the list to start learning</p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="right">
              {user && user.role === "admin" && (
                <button 
                  style={{
                    padding: "12px 20px",
                    background: "linear-gradient(135deg, #8a4baf 0%, #b575d3 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                  onClick={() => setShow(!show)}
                >
                  {show ? "Close" : "+ Add Lecture"}
                </button>
              )}

              {show && (
                <div className="lecture-form">
                  <h2>Add Lecture</h2>
                  <form onSubmit={submitHandler}>
                    <div>
                      <label htmlFor="title">Title</label>
                      <input
                        id="title"
                        type="text"
                        placeholder="Enter lecture title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        placeholder="Enter lecture description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ minHeight: "80px", fontFamily: "inherit" }}
                      />
                    </div>

                    <div>
                      <label htmlFor="video">Video File</label>
                      <input
                        id="video"
                        type="file"
                        placeholder="choose video"
                        onChange={changeVideoHandler}
                        required
                      />
                    </div>

                    {videoPrev && (
                      <video
                        src={videoPrev}
                        alt=""
                        width="100%"
                        height="200"
                        controls
                        style={{ borderRadius: "8px", marginTop: "10px" }}
                      ></video>
                    )}

                    <button
                      disabled={btnLoading}
                      type="submit"
                      style={{
                        padding: "12px 20px",
                        background: "linear-gradient(135deg, #8a4baf 0%, #b575d3 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: btnLoading ? "not-allowed" : "pointer",
                        fontWeight: "600",
                        opacity: btnLoading ? 0.6 : 1,
                        transition: "all 0.3s ease",
                        textTransform: "uppercase",
                        fontSize: "12px",
                        width: "100%",
                      }}
                    >
                      {btnLoading ? "Adding..." : "Add Lecture"}
                    </button>
                  </form>
                </div>
              )}

              {lectures && lectures.length > 0 && (
                <div className="lectures-list">
                  <h3>Lectures ({lectures.length})</h3>
                  {lectures.map((e, i) => (
                    <div key={e._id}>
                      <div
                        onClick={() => fetchLecture(e._id)}
                        className={`lecture-number ${
                          lecture._id === e._id ? "active" : ""
                        }`}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      >
                        <span>
                          {i + 1}. {e.title}
                        </span>
                        {progress[0] &&
                          progress[0].completedLectures.includes(e._id) && (
                            <TiTick style={{ color: "greenyellow", fontSize: "18px" }} />
                          )}
                      </div>
                      {user && user.role === "admin" && (
                        <button
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            background: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "600",
                            marginBottom: "10px",
                            transition: "all 0.3s ease",
                          }}
                          onClick={() => deleteHandler(e._id)}
                          onMouseOver={(e) => e.target.style.background = "#da190b"}
                          onMouseOut={(e) => e.target.style.background = "#f44336"}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {(!lectures || lectures.length === 0) && (
                <div style={{
                  background: "var(--card-bg)",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "center",
                  color: "var(--text-color)",
                  opacity: 0.7,
                }}>
                  <p>No lectures yet</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
