import React from 'react'

function MyProfile() {
  return (
    <div>
        <div className='container text-center border shadow py-3 my-5'>
            <h3>My Profile</h3>
            <label>
                <input type="file"  style={{display:'none'}}/>
                <img width={'100px'} height={'100px'} src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
            </label>

            <div className='w-50 mb-3 ' style={{marginLeft:'150px'}}>
                <input type="text" placeholder='Username' className='form-control my-3' />
                <input type="text" placeholder='Github' className='form-control my-3 ' />
                <input type="text" placeholder='Linkedin' className='form-control my-3' />

            </div>
        </div>
    </div>
  )
}

export default MyProfile