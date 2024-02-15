import React, { useState, useEffect } from 'react';
import '../App.css';
import Slider from '../components/Slider.jsx'
import SidebarItem from '../components/SlidebarItem.jsx'
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const selectedOption = options[selectedOptionIndex]

  const [product, setProduct] = useState([]);
  const url = 'http://localhost:3000'

  const { id } = useParams();

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${url}/projects/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    });
        // console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);
//   console.log(product);


  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }


  console.log(getImageStyle())
 
  // window.onload = function() {
  //   const canvas = document.getElementById("myCanvas");
  //   const ctx = canvas.getContext("2d");
  //   const img = document.getElementById("scream");
  //   ctx.drawImage(img, 10, 10);
  // };

  return (
    <div className="container mt-6 ml-[320px] max-w-[950px] rounded-xl">
      <img id="edited"className="main-image rounded-xl" src={product.imageUrl}  style={getImageStyle()} alt="" />
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => setSelectedOptionIndex(index)}
            />
          )
        })}
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />

        
    </div>
    
    
  )
  
}

export default App;