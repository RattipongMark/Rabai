import React, { useState, useEffect } from "react";
import '../App.css';
import { useAuth } from '../contexts/AuthContext';
import Bg from '../assets/bg';
import Navb from '../assets/Navbar';
import { Button, Input, Modal, Form } from "antd";
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';

const Activity = () => {
    const { logout } = useAuth();
    const handleLogout = async () => {
      await logout();
    };
  
    const [activities, setActivities] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newActivity, setNewActivity] = useState({
        title: '',
        details: '',
        tag: '',
        location: '',
        date: '',
        time: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewActivity(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    useEffect(() => {
        const fetchActivities = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/activities/');
            const data = await response.json();
            setActivities(data);
          } catch (error) {
            console.error('Error fetching activities: ', error);
          }
        };
        fetchActivities();
    }, []);

    const handleTagChange = (tag) => {
      setSelectedTag(tag);
    };

    const handleJoin = (activityId) => {
        console.log("Joining activity with ID:", activityId);
    };

    const handleNewActivity = () => {
        setIsModalVisible(true);
    };

    const handleCreateActivity = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/activities/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newActivity),
          });
          
          if (response.ok) {
            const createdActivity = await response.json();
            setActivities([...activities, createdActivity]);
            setNewActivity({ title: '', details: '', tag: '', location: '', date: '', time: '' });
            setIsModalVisible(false);
          } else {
            console.error('Failed to create new activity');
          }
        } catch (error) {
          console.error('Error creating new activity:', error);
        }
      };

    const filteredActivities = selectedTag ? activities.filter(activity => activity.tag === selectedTag) : activities;

    const ActivityTemplate = ({ activity }) => (
        <div className="card bg-[#404664] p-6 lgt-txt w-full space-y-4">
            <div className="flex items-center">
                <img src={activity.user?.avatar || './default-avatar.png'} className="w-12 h-12 rounded-full mr-8" alt="Avatar" />
                <div>
                    <p className="font-semibold">{activity.user?.name}</p>
                    <p className="text-gray-400 text-sm">{activity.timestamp}</p>
                </div>
                <div className="ml-auto">
                    <span className="bg-[#E1F3FF] text-xs font-semibold text-[#0095FF] px-5 py-0.5 rounded-full">
                        {activity.tag}
                    </span>
                </div>
            </div>
            <p className="lgt-txt text-sm leading-relaxed">{activity.details}</p>
            <div className="flex justify-end">
                <Button onClick={() => handleJoin(activity.id)} type="primary">Join</Button>
            </div>
        </div>
    );    

    return (
      <Bg>
        <Navb />
        <div className='justify-center p-28'>
          <div className='flex justify-between mb-4 '>
            <Button icon={<PlusOutlined />} onClick={handleNewActivity} type="primary" style={{backgroundColor:'#FB923C'}}>New Activity</Button>
            <div className='relative'>
            <input className='w-[460px] h-14 pl-6 bg-white bg-opacity-50 rounded-full lgt-txt mr-5 placeholder:text-gray-300' type='text' placeholder='Search Activity'></input>
              <FilterOutlined className='absolute right-14 top-5 cursor-pointer' />
            </div>
            <div className='dropdown dropdown-end'>
              <button tabIndex={0} className='size-14 bg-white bg-opacity-50 rounded-full relative'>
                <FilterOutlined className='absolute right-4 top-5' />
              </button>
              <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><button onClick={() => handleTagChange('CPE')}>CPE</button></li>
                <li><button onClick={() => handleTagChange('General')}>General</button></li>
                <li><button onClick={() => handleTagChange('')}>All Tags</button></li>
              </ul>
            </div>
          </div>

          <div className='space-y-4 overflow-y-auto p-6 h-[640px] scroller'>
          <div className="card bg-[#404664] w-full">
            <div className="flex justify-start items-center p-5">
              <img src="./profilegoose2.svg" className='w-12 h-12 rounded-full mr-8'/>
              <p className='lgt-txt'>What's on your want to do</p>
            </div>
          </div>
          </div>

          <div className='space-y-4 overflow-y-auto p-6 h-[640px] scroller'>
            {filteredActivities.map((activity, index) => (
              <ActivityTemplate key={index} activity={activity} />
            ))}
          </div>

          <Modal
            title="Create New Activity"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={handleCreateActivity}
          >
            <Form layout="vertical">
              <Form.Item label="Title">
                <Input name="title" value={newActivity.title} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label="Details">
                <Input.TextArea name="details" value={newActivity.details} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label="Tag">
                <Input name="tag" value={newActivity.tag} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label="Location">
                <Input name="location" value={newActivity.location} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label="Date">
                <Input name="date" value={newActivity.date} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label="Time">
                <Input name="time" value={newActivity.time} onChange={handleInputChange} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Bg>
    );
};

export default Activity;
