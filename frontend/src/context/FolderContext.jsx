import { createContext, useContext, useState, useEffect } from "react";
import { folderService } from "../services/folderService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create context
const FolderContext = createContext();

// Custom hook to use the folder context
export const useFolders = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
};

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [folderTree, setFolderTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFolder, setActiveFolder] = useState(null);
  const [folderBookmarks, setFolderBookmarks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const navigate = useNavigate();

  // Fetch all folders
  const fetchFolders = async (nested = false) => {
    try {
      setLoading(true);
      const response = await folderService.getAllFolders(nested);

      if (response.data && response.data.success) {
        if (nested) {
          setFolderTree(response.data.data);
        } else {
          setFolders(response.data.data);
        }
      } else {
        setFolders([]);
        setFolderTree([]);
        console.warn("Unexpected response format:", response);
      }

      setError("");
    } catch (err) {
      setError("Failed to fetch folders");
      console.error(err);
      setFolders([]);
      setFolderTree([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch folder with its bookmarks
  const fetchFolderBookmarks = async (folderId) => {
    if (!folderId) {
      setFolderBookmarks([]);
      return;
    }

    try {
      setLoading(true);
      const response = await folderService.getFolderBookmarks(folderId);

      if (response.data && response.data.success) {
        setFolderBookmarks(response.data.data);
      } else {
        setFolderBookmarks([]);
        console.warn("Unexpected response format:", response);
      }

      setError("");
    } catch (err) {
      setError("Failed to fetch folder bookmarks");
      console.error(err);
      setFolderBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  // Create a new folder
  const handleCreateFolder = async (folderData) => {
    try {
      const response = await folderService.createFolder(folderData);
      
      if (response.data && response.data.success) {
        toast.success("Folder created successfully");
        fetchFolders(true);
        return response.data.data;
      } else {
        toast.error("Failed to create folder");
        return null;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create folder");
      console.error(err);
      return null;
    }
  };

  // Update an existing folder
  const handleUpdateFolder = async (folderId, folderData) => {
    try {
      const response = await folderService.updateFolder(folderId, folderData);
      
      if (response.data && response.data.success) {
        toast.success("Folder updated successfully");
        fetchFolders(true);
        return response.data.data;
      } else {
        toast.error("Failed to update folder");
        return null;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update folder");
      console.error(err);
      return null;
    }
  };

  // Delete a folder
  const handleDeleteFolder = async (folderId) => {
    // Confirm deletion
    if (!window.confirm("Are you sure you want to delete this folder? All bookmarks in this folder will be removed from the folder.")) {
      return false;
    }
    
    try {
      const response = await folderService.deleteFolder(folderId);
      
      if (response.data && response.data.success) {
        toast.success("Folder deleted successfully");
        
        // If the deleted folder was active, navigate back to folders view
        if (activeFolder === folderId) {
          setActiveFolder(null);
          navigate("/dashboard/folders");
        }
        
        fetchFolders(true);
        return true;
      } else {
        toast.error("Failed to delete folder");
        return false;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete folder");
      console.error(err);
      return false;
    }
  };

  // Add bookmark to folder
  const handleAddBookmarkToFolder = async (bookmarkId, folderId) => {
    try {
      const response = await folderService.addBookmarkToFolder(bookmarkId, folderId);
      
      if (response.data && response.data.success) {
        toast.success("Bookmark added to folder");
        
        // If we're viewing this folder, refresh its contents
        if (activeFolder === folderId) {
          fetchFolderBookmarks(folderId);
        }
        
        return true;
      } else {
        toast.error("Failed to add bookmark to folder");
        return false;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add bookmark to folder");
      console.error(err);
      return false;
    }
  };

  // Remove bookmark from folder
  const handleRemoveBookmarkFromFolder = async (bookmarkId, folderId) => {
    try {
      const response = await folderService.removeBookmarkFromFolder(bookmarkId, folderId);
      
      if (response.data && response.data.success) {
        toast.success("Bookmark removed from folder");
        
        // If we're viewing this folder, refresh its contents
        if (activeFolder === folderId) {
          fetchFolderBookmarks(folderId);
        }
        
        return true;
      } else {
        toast.error("Failed to remove bookmark from folder");
        return false;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove bookmark from folder");
      console.error(err);
      return false;
    }
  };

  // Get folders containing a bookmark
  const getBookmarkFolders = async (bookmarkId) => {
    try {
      const response = await folderService.getBookmarkFolders(bookmarkId);
      
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        console.warn("Unexpected response format:", response);
        return [];
      }
    } catch (err) {
      console.error("Failed to get bookmark folders:", err);
      return [];
    }
  };

  // Open modal to create new folder
  const openCreateFolderModal = (parentId = null) => {
    setEditingFolder(null);
    setIsModalOpen(true);
  };

  // Open modal to edit existing folder
  const openEditFolderModal = (folder) => {
    setEditingFolder(folder);
    setIsModalOpen(true);
  };

  // Set active folder and fetch its bookmarks
  const selectFolder = (folderId) => {
    setActiveFolder(folderId);
    fetchFolderBookmarks(folderId);
    navigate(`/dashboard/folders/${folderId}`);
  };

  // First load of folders
  useEffect(() => {
    fetchFolders(true);
  }, []);

  // Context value
  const value = {
    folders,
    folderTree,
    loading,
    error,
    activeFolder,
    folderBookmarks,
    isModalOpen,
    setIsModalOpen,
    editingFolder,
    fetchFolders,
    fetchFolderBookmarks,
    handleCreateFolder,
    handleUpdateFolder,
    handleDeleteFolder,
    handleAddBookmarkToFolder,
    handleRemoveBookmarkFromFolder,
    getBookmarkFolders,
    openCreateFolderModal,
    openEditFolderModal,
    selectFolder,
  };

  return (
    <FolderContext.Provider value={value}>
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContext;