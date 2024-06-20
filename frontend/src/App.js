import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductReview from './pages/ProductReview';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ManageProduct from './pages/ManageProduct';
import ForumDiscussions from './pages/ForumDiscussions';
import BlogPage from './pages/BlogPage';
import AddNewBlog from './pages/AddNewBlog';
import ViewSelectedBlog from './pages/ViewSelectedBlog';
import AddProduct from './pages/AddProduct';
import AccountPage from './pages/AccountPage';
import ResetPassword from './pages/ResetPassword';
import EditAccount from './pages/EditAccount'; 
import UserProvider from './context/UserContext';
import ViewUserAccount from './pages/ViewUserAccount';
import ViewMerchantAccount from './pages/ViewMerchantAccount';
import ViewAdminAccount from './pages/ViewAdminAccount';
import AddDiscussion from './pages/AddDiscussion';
import AddNewQA from './pages/AddNewQA';
import ViewSelectedQA from './pages/ViewSelectedQA';
import CommunityPage from './pages/CommunityPage';
import Feedback from './pages/Feedback';
import ViewSelectedDiscussion from './pages/ViewSelectedDiscussion';
import AboutPage from './pages/AboutPage';
import EditProduct from './pages/EditProduct';
import CreateCommunity from './pages/CreateCommunity';
import ExpertQA from './pages/ExpertQA';
import WishlistPage from './pages/WishlistPage';
import RecommendationPage from './pages/RecommendationPage';



function App() {
  const [isLoggedIn] = useState(true);
  const [isMerchant] = useState(false);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/homepage" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/product" element={<ProductReview />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manageproduct" element={<ManageProduct isMerchant={isMerchant} />} />
          <Route path="/forumdiscussions" element={<ForumDiscussions />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/addnewblog" element={<AddNewBlog />} />
          <Route path="/viewselectedblog" element={<ViewSelectedBlog />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/edit-account" element={<EditAccount />} />
          <Route path="/viewuseraccount" element={<ViewUserAccount />} />
          <Route path="/viewmerchantaccount" element={<ViewMerchantAccount />} />
          <Route path="/viewadminaccount" element={<ViewAdminAccount />} />
          <Route path="/adddiscussion" element={<AddDiscussion />} />
          <Route path="/addnewqa" element={<AddNewQA />} />
          <Route path="/viewselectedqa" element={<ViewSelectedQA />} />
          <Route path="/communities" element={<CommunityPage />} />
          <Route path='/addfeedback' element={<Feedback isLoggedIn={isLoggedIn}/>} />
          <Route path="/viewselecteddiscussion" element={<ViewSelectedDiscussion />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/createcommunity" element={<CreateCommunity />} />
          <Route path="/expertqa" element={<ExpertQA />} />
          <Route path="/bookmarks" element={<WishlistPage />} />
          <Route path="/recommend" element={<RecommendationPage />} />


        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
