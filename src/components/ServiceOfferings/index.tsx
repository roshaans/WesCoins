import React, {useState, useEffect} from 'react'
import firebase from 'firebase/app';
// var firebase = require('firebase/app');
// require('firebase/auth');
import "firebase/database";
import './style.scss';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers'

// require('firebase/database');

export const PostOffer = (account) => {
    const [input, setInput] = useState({title: "", offer: "", by: account.account, description: "", perks: "", acceptedBy: ""})
    const postOffer = async (event) => {
        event.preventDefault();

        const ref = firebase.database().ref().child("tasks")
        ref.push(input)
        
    }
    return (
    <>
    <div className='justify-center items-center flex w-7/12'>
      <form className='flex flex-col gap-2 font-medium' onSubmit = {postOffer}>
      Title<input type="text" required className='bg-gray-200 shadow-inner rounded p-2 flex-1 w-96' aria-label='Job Title' placeholder='Enter a short name for the job' onChange={e => setInput((prev_state) => ({...prev_state, title: e.target.value}))} />
       Offer(WesCoins) <input type="number" required className='bg-gray-200 shadow-inner rounded p-2 flex-1' aria-label='Offer Amount' placeholder='How many WesCoins is this job for?'  onChange={e => setInput((prev_state) => ({...prev_state, offer: e.target.value}))} />
       Description <input type="text" required className='bg-gray-200 shadow-inner rounded p-2 flex-1' aria-label='Job Description' placeholder='Add more detail about the job here...'  onChange={e => setInput((prev_state) => ({...prev_state, description: e.target.value}))} />
       Perks <input type="text" className='bg-gray-200 shadow-inner rounded p-2 flex-1' aria-label='Additinal Perks (Optional)' placeholder='What other perks are you willing to offer?'  onChange={e => setInput((prev_state) => ({...prev_state, perks: e.target.value}))} />

        <button className='bg-blue-600 hover:bg-blue-700 duration-300 text-black shadow p-2 rounded' type='submit' >
          Offer Job
        </button>
      </form>
    </div>
    </>)
}

const CreateTasks = (id) => {
    const [task, setTask] = React.useState({})

    React.useEffect( () => {

        const newRef = firebase.database().ref().child("tasks").child(id)
        newRef.on("value", snapshot => {
            let taskObject = snapshot.val()
            if (taskObject) {
                const taskList: any[] = Object.keys(taskObject).map(key => ({
                  ...taskObject[key], id: key
                }));
                console.log(taskList + "ids")


                // setTasks(taskList);
            

            }
            // console.log(task_details, "task val")
            // setTask(task_details)
            return newRef.off('value');

        })

        return 
    }
        
        ,[])
    

     return(
        <>
        <ViewTask props = {task}> </ViewTask>
        </>)
}
export const MyTasks = ({account}) => {
    const [myTasks, setMyTasks] = useState<String[]>([])
    const [taskIds, setTaskIds] = useState<String[]>([])

    React.useEffect(() => {

        const ref = firebase.database().ref().child("users").child(account)
        console.log(ref.get(), "get val")
        ref.on("value", function(snapshot) {
            console.log("RUNNING")
            let taskObject = snapshot.val()
            console.log("taskobject", taskObject)
            if (taskObject) {
                const taskList: any[] = Object.keys(taskObject).map(key => ({
                  ...taskObject[key]
                }));
                console.log(taskList + "idssss")


                // setTasks(taskList);
            


            }
            // console.log(task_Ids, "task idddd")

           })

        //    return ref.off('value');

        }, [])
        


    return(<>
      {taskIds != [] && taskIds.map(id => {
                // editEvent(id)
                
            <CreateTasks id = {id}> </CreateTasks>

                
            })}
    </>)

}
export const ServiceOfferings = (props: any) => {
    const context = useWeb3React<Web3Provider>()
    const [showCreatePost, setShowCreatePost] = useState(false)
    const { account} = context

    const [tasks, setTasks] = useState<any[]>([]);
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(false)
    const toggleAcceptOffer = (key) => {
        const ref = firebase.database().ref().child("tasks").child(key)
        // console.log(key + "key")
        ref.once("value").then(function(snapshot) {
            if (snapshot.val().acceptedBy == account as string) {
                ref.set({...snapshot.val(), acceptedBy: ""})

            } else {
                ref.set({...snapshot.val(), acceptedBy: account as string})

            }
           
        })
    }

    

    useEffect(() => {
        const ref = firebase.database().ref().child("tasks")
        
        const listener = ref.on('value', snapshot => {
            setValue(snapshot.val())
            let taskObject = snapshot.val()

            if (taskObject) {
                const taskList: any[] = Object.keys(taskObject).map(key => ({
                  ...taskObject[key], id: key
                }));
                setTasks(taskList);
                setLoading(false)


            } else {
                setLoading(true)
            }
            // this.setState({ loading: false });
            // console.log(snapshot.val() + " val from database")
    
            
        });
        // return () => ref.off('value', listener);
    }, []);
return (
   
    <div>
<ol > 
        {tasks.map(task => {
            return(<>


    <li className = "mt-8" key = {task.id}> 
    <div className = "cursor-pointer">

            <div className="w-5/12 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
            
                <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png"/>
                
                <div className="w-full px-8 absolute top-8">
              
                {/* <div  className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4"> */}
        <div className="flex justify-between px-4 items-start text-left w-full">
            <div className="text-lg font-semibold w-full"> 
            <div className = "flex justify-between w-full">
            {task.title}

            <label className="inline-flex items-center cursor-pointer text-right">
    <div className="relative ">
      <input type="checkbox" id="toggleB" checked = {account== task.acceptedBy} onClick = {() => toggleAcceptOffer(task.id)} className="sr-only"/>
      <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
      <div className="dot absolute left-1 top-1 bg-green w-6 h-6 rounded-full transition"></div>
    </div>
    <div className="ml-3 text-gray-700 font-medium">
    </div>
  </label>
  </div>

         <p className="text-gray-400 text-base">{task.offer} WesCoins</p>
         {task.description}
         <br/>
            Additional Perks: {task.perks}
            <p className="text-gray-400 text-sm">Service Request By: {task.by}  </p>

            </div>
           

        </div>
      {/* </div>    */}
                            </div>
                        </div>
                    </div>
  
    </li>
           


            </>)
            
        })}
        </ol>

    </div>
    )
}

export const ViewTask = (props) => {
    return (
    <div className = "cursor-pointer">

            <div className="w-5/12 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
            
                <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png"/>
                
                <div className="w-full px-8 absolute top-8">
              
                {/* <div  className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4"> */}
        <div className="flex justify-between px-4 items-start text-left w-full">
            <div className="text-lg font-semibold w-full"> 
            <div className = "flex justify-between w-full">
            {props.title}

            <label className="inline-flex items-center cursor-pointer text-right">

    <div className="ml-3 text-gray-700 font-medium">
    </div>
  </label>
  </div>
         <p className="text-gray-400 text-base">{props.offer} WesCoins</p>
         {props.description}
         <br/>
            Additional Perks: {props.perks}
            </div>
           
        </div>
      {/* </div>    */}
                            </div>
                        </div>
                    </div>)
} 




