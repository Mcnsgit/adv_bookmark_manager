import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFolders } from "../../context/FolderContext";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/components/Folder.css";
import Button from "../ui/Button";
import { Check, X } from "@phosphor-icons/react";

const FolderForm = ({ folder, onSuccess, onCancel }) => {
  const { folders, handleCreateFolder, handleUpdateFolder } = useFolders();
  const { currentTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    parent_id: ""
  });

  // Set initial form data if editing a folder
  useEffect(() => {
    if (folder) {
      setFormData({
        name: folder.name,
        parent_id: folder.parent_id || ""
      });
    }
  }, [folder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format data
      const folderData = {
        name: formData.name,
        parent_id: formData.parent_id || null
      };

      let result;
      if (folder) {
        // Update existing folder
        result = await handleUpdateFolder(folder._id, folderData);
      } else {
        // Create new folder
        result = await handleCreateFolder(folderData);
      }

      if (result) {
        // Reset form
        setFormData({
          name: "",
          parent_id: ""
        });

        // Notify parent component
        if (onSuccess) {
          onSuccess(result);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter out the current folder and its descendants to prevent circular parent relationships
  const getAvailableParentFolders = () => {
    if (!folder) return folders;

    // Filter out the current folder and any of its descendants
    const isDescendant = (potentialParent, currentId) => {
      if (potentialParent._id === currentId) return true;
      
      if (potentialParent.children && potentialParent.children.length > 0) {
        return potentialParent.children.some(child => 
          isDescendant(child, currentId)
        );
      }
      
      return false;
    };

    return folders.filter(f => !isDescendant(f, folder._id));
  };

  return (
    <div className="folder-form">
      <form onSubmit={handleSubmit}>
        <div className="folder-form-group">
          <label htmlFor="name" className="folder-form-label">
            Folder Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="folder-form-control"
            placeholder="My Folder"
            required
          />
        </div>

        <div className="folder-form-group">
          <label htmlFor="parent_id" className="folder-form-label">
            Parent Folder (optional)
          </label>
          <select
            id="parent_id"
            name="parent_id"
            value={formData.parent_id}
            onChange={handleChange}
            className="folder-form-select"
          >
            <option value="">None (Root folder)</option>
            {getAvailableParentFolders().map((f) => (
              <option key={f._id} value={f._id} disabled={f._id === folder?._id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="folder-form-actions">
          {onCancel && (
            <Button
              variant="outline"
              size="md"
              onClick={onCancel}
              leftIcon={<X size={16} weight="bold" />}
              disabled={loading}
            >
              Cancel
            </Button>
          )}

          <Button
            variant="primary"
            size="md"
            type="submit"
            leftIcon={<Check size={16} weight="bold" />}
            disabled={loading}
          >
            {loading 
              ? folder 
                ? "Updating..." 
                : "Creating..." 
              : folder 
                ? "Update Folder" 
                : "Create Folder"}
          </Button>
        </div>
      </form>
    </div>
  );
};

FolderForm.propTypes = {
  folder: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    parent_id: PropTypes.string
  }),
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func
};

export default FolderForm;