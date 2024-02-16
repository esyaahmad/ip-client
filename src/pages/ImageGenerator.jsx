import { saveAs } from "file-saver";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function generator() {
  const [image, setImage] = useState("");
  const [resolution, setResolution] = useState("");
  const [category1, setCategory1] = useState("");

  let url = `https://source.unsplash.com/${resolution}/?${category1}`;
  // axios.get(url).then( data => {
  //     // the url of the random img
  //     console.log(data.request.responseURL);
  // });

  //     fetch('https://source.unsplash.com/1920x1080/?nature').then( data => {
  // 	console.log(data.url);
  // });

  console.log(url);

  const downloadImage = () => {
    if (!resolution || !category1) {
      throw Swal.fire({
        title: "Please Select Your Preferences",
        icon: "error",
      });
    } else {
      saveAs(url, "image.jpg"); // Put your image URL here.
    }
  };

  // const [copySuccess, setCopySuccess] = useState("")
  // const textAreaRef = useRef(null)

  // async function copyToClip() {
  //     await navigator.clipboard.writeText(location.href);
  //     setCopySuccess("Copied");
  // }

  return (
    <>
      <div className="mt-4 ml-[320px] mr-8">
        <div className="navbar bg-white rounded-xl border-2 border-gray-300	">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl text-gray-700">Select Your Preferences</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li className="mx-8">
                <select className="w-full input input-bordered input-primary" name="resolution" id="" onChange={(e) => setResolution(e.target.value)}>
                  <option value="" disabled selected>
                    Resolution
                  </option>
                  <option value="1280x720">1280x720 (HD)</option>
                  <option value="1980x1080">1980x1080 (FHD)</option>
                  <option value="2048x1080">2048x1080 (2K)</option>
                  <option value="3840x2160">3840x2160 (4K)</option>
                </select>
              </li>
              <li>
                <select className="w-full input input-bordered input-primary" name="resolution" id="" onChange={(e) => setCategory1(e.target.value)}>
                  <option value="" disabled selected>
                    Category
                  </option>
                  <option value="Nature">Nature</option>
                  <option value="Abstract">Abstract</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="car">Car</option>
                  <option value="Scifi">Scifi</option>
                  <option value="Building">Building</option>
                  <option value="Flower">Flower</option>
                  <option value="Forest">Forest</option>
                  <option value="Graphic">Graphic</option>
                  <option value="Animals">Animals</option>
                  <option value="Food">Food</option>
                  <option value="Technology">Technology</option>
                  <option value="Space">Space</option>
                  <option value="Summer">Summer</option>
                </select>
              </li>
              <li className="mx-8">
                <button className="btn btn-success text-xl" onClick={downloadImage}>
                  Download
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 ml-[320px] mr-8 ">
        <img className="rounded-xl max-h-[600px] min-w-[1180px] " src="https://source.unsplash.com/1280x720/?nature" alt="" />
      </div>
    </>
  );
}
