import React from "react";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createQuestion } from "../../actions/questionAction";
import { ToastContainer, toast } from "react-toastify";

const AskQuestion = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const { user } = useSelector((state) => state.user);
    const { isAdded } = useSelector((state) => state.question);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user == null) {
            toast.error("Please login first");
            navigate("/auth/login");
        }
        if (isAdded) {
            toast.success("Answer added successfully");
            dispatch(clearError());
            navigate("/");
            return;
        }
    }, [dispatch, isAdded, navigate, user]);
    const handleSubmit = () => {
        if (!title || !body || !tags) {
            alert("All field are necessary");
            return;
        }
        const tagsArray = tags.split(" ");
        console.log(tagsArray);
        dispatch(createQuestion(title, body, tagsArray));
    };
    return (
        <>
            <div className="mt-14 bg-white/60 px-8 flex flex-col gap-5 ml-5">
                <div className="pt-8">
                    <span className="font-bold text-2xl">
                        Ask a public question
                    </span>
                </div>
                <div className="w-4/5 border-2 bg-white rounded-md p-4">
                    <div className="">
                        <label htmlFor="title">
                            <p className="font-bold">Title</p>{" "}
                        </label>
                        <p className="text-xs font-base my-1">
                            Be specific and imagine you're are asking a question
                            to another person
                        </p>
                        <div className="border-2 rounded-md w-3/4">
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g Is there an R function for finding the index of an element in the vector"
                            />
                        </div>
                    </div>
                    <div className="bg-white  flex flex-col my-3">
                        <label htmlFor="body">
                            <p className="font-bold">Body</p>{" "}
                        </label>
                        <p className="text-xs font-base my-1">
                            Include all the information someone would need to
                            answer the question.
                        </p>
                        <textarea
                            placeholder=""
                            className="border-2 w-3/4 rounded-md text-sm p-3 font-mono"
                            name="body"
                            id="body"
                            cols="40"
                            rows="10"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <div className="">
                            <label htmlFor="tags">
                                <p className="font-bold">Tags</p>{" "}
                            </label>
                            <p className="text-xs font-base my-1">
                                Add upto 5 tags to describe what your question
                                is about
                            </p>
                            <div className="border-2 rounded-md w-3/4">
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="e.g Typescript "
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        className="bg-lt-blue px-5 rounded-md p-2 text-white hover:bg-sky-600 font-semibold"
                        onClick={() => handleSubmit()}
                    >
                        Post your Question
                    </button>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default AskQuestion;
