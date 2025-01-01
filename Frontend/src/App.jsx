import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";   //for using react icons
import { PieChart } from '@mui/x-charts/PieChart';                 // for using pie charts
import { publicRequest } from './requestMethod'


function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [expenses, setExpenses] = useState([])
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [updatedId, setUpdatedId] = useState("");
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  //for search
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };
  const handleShowReport = () => {
    setShowReport(!showReport)
  }

  const handleShowEdit = (id) => {
    setShowEdit(!showEdit);
    setUpdatedId(id)
  }
  const handleUpdateExpense = async () => {
    if (updatedId) {
      try {
        await publicRequest.put(`/expenses/${updatedId}`, {
          label: updatedLabel,
          date: updatedDate,
          value: updatedAmount
        })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleExpense = async () => {
    try {
      await publicRequest.post("/expenses", {
        label,
        date,
        value: amount
      })
      window.location.reload() //reload the page to show the saved data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {  //get All the expenses
    const getExpense = async () => {
      try {
        const res = await publicRequest.get("/expenses");
        setExpenses(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getExpense()
  }, [])

  //delete expense
  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  //search
  const filteredExpenses = expenses.filter((expense) =>
      expense.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
    <div>
      <div className=" flex flex-col justify-center items-center mt-[2%] w-[95%] sm:w-[80%] lg:w-[80%] xl:w-[80%] mx-auto">
        <h1 className="text-4xl font-bold text-[#0a0a0a]">Expense Tracker</h1>

        <div className="relative flex items-center justify-between mt-7 w-[100%] gap-2 sm:w-[60%] lg:w-[60%] xl:w-[60%] ">
          <div className="relative flex justify-between w-[300px]">
            <button
              onClick={handleAddExpense}
              className="bg-[#af8978] p-[8px] sm:p-[10px] lg:p-[10px] xl:p-[10px] border-none rounded-md outline-none text-white text-xs sm:text-lg lg:text-lg xl:text-lg font-medium hover:bg-[#8a6d5e] hover:scale-105"
            >
              Add Expense
            </button>
            <button onClick={handleShowReport} className="bg-blue-500 p-[8px] sm:p-[10px] lg:p-[10px] xl:p-[10px] border-none rounded-md outline-none text-white text-xs sm:text-lg lg:text-lg xl:text-lg font-medium hover:bg-blue-700 hover:scale-105">
              Expense Report
            </button>
          </div>
          {/* Add expense popup */}
          {showAddExpense && (
            <div className="absolute z-[999] bg-white flex flex-col p-[10px] top-[60px] left-0 h-[450px] sm:h-[500px] lg:h-[500px] xl:h-[500px] w-[300px] sm:w-[500px] lg:w-[500px] xl:w-[500px]  shadow-xl gap-2 pl-[20px] pr-[20px]">
              <FaWindowClose
                onClick={handleAddExpense}
                className="text-red-600 flex justify-end items-end text-3xl cursor-pointer hover:scale-125"
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Name
              </label>
              <input
                type="text"
                placeholder="Snacks"
                onChange={(e) => setLabel(e.target.value)}
                className=" rounded-md border-2 border-[#555] border-solid p-[10px] outline-none"
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Date
              </label>
              <input
                type="date"
                placeholder="16/03/2001"
                onChange={(e) => setDate(e.target.value)}
                className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Amount
              </label>
              <input
                type="number"
                placeholder="100"
                onChange={(e) => setAmount(e.target.value)}
                className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
              />

              {/* Add expense button on popup*/}
              <button className="border rounded-lg bg-[#af8978]  p-[15px] border-none cursor-pointer my-[18px] text-xl font-bold hover:bg-[#8a6d5e]" onClick={handleExpense}>
                Add Expense
              </button>
            </div>
          )}
          {/* add Expense report popup */}
          {showReport && (
            <div className="absolute z-[1000] bg-white  top-[60px] left-[0px] sm:left-[100px] lg:left-[100px] xl:left-[100px] h-[300px] sm:h-[450px] lg:h-[450px] xl:h-[450px] w-[350px]  sm:w-[450px] lg:w-[450px] xl:w-[450px] shadow-xl flex flex-col items-center justify-between">
              <FaWindowClose
                onClick={handleShowReport}
                className="text-red-600 absolute right-2 text-3xl cursor-pointer hover:scale-125 z-[1000]"
              />
              
              <PieChart className="pt-14"
                series={[
                  {
                    data: expenses,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: "30%",
                    cy: "35%",
                  }
                ]}
                
              />
        
              <div className="flex justify-center pb-2">
                <p className="text-2xl font-bold  text-red-900">Total Expense : ₹ {expenses.reduce((total,expense)=>total+ parseFloat(expense.value || 0),0)}</p>
              </div>
              



            </div>
          )}


          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="p-[10px] w-[200px] border rounded-lg border-slate-800 border-solid"
            />
          </div>
        </div>

        <div className="flex-flex-col">
          {filteredExpenses.map((item, index) =>
            <>
              <div className="relative flex justify-center sm:justify-between lg:justify-between xl:justify-between  items-center w-[100%] sm:w-[100vh] lg:w-[100vh] xl:w-[100vh] h-[95%] sm:h-[100px] lg:h-[100px] xl:h-[100px] bg-[#f3edeb] my-[20px] py-[10px] text-[18px] text-[#555] font-medium" key={index}>
                <h2 className="m-[20px]  ">
                  {item.label}
                </h2>
                <span className="m-[20px]  ">
                  {item.date}
                </span>
                <span className="m-[20px] ">
                  {item.value}
                </span>

                <div className="m-[20px] text-xl">
                  <FaTrash onClick={() => handleDelete(item._id)} className="text-red-500 mb-[9px] cursor-pointer hover:scale-125" />
                  <FaEdit onClick={() => handleShowEdit(item._id)} className="text-[#555] mb-[5px] cursor-pointer hover:text-green-600 hover:scale-125" />
                </div>
              </div>


            </>
          )}
        </div>

        {/* //show popup on click of edit */}
        {showEdit && (
          <div className="absolute z-[999] bg-white flex flex-col p-[10px] top-[25%] right-[5%] sm:right-[10%] lg:right-[10%] xl:right-[5%] h-[500px] sm:h-[500px] lg:h-[500px] xl:h-[450px] w-[95%] sm:w-[500px] lg:w-[500px] xl:w-[500px] shadow-xl gap-2">
            <FaWindowClose
              onClick={handleShowEdit}
              className="text-red-600 absolute right-2  text-3xl cursor-pointer hover:scale-125"
            />

            <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
              Expense Name
            </label>
            <input
              type="text"
              placeholder="Snacks"
              onChange={(e) => setUpdatedLabel(e.target.value)}
              className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
            />

            <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
              Expense Date
            </label>
            <input
              type="date"
              placeholder="16/03/2001"
              onChange={(e) => setUpdatedDate(e.target.value)}
              className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
            />

            <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
              Expense Amount
            </label>
            <input
              type="number"
              placeholder="100"
              onChange={(e) => setUpdatedAmount(e.target.value)}
              className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
            />

            {/* Add expense button on popup*/}
            <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[15px] text-xl font-bold hover:bg-[#8a6d5e]" onClick={handleUpdateExpense}>
              Update Expense
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
