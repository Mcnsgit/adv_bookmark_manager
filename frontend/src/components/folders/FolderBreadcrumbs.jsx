import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFolders } from "../../context/FolderContext";
import { useTheme } from "../../context/ThemeContext";
import { House, CaretRight } from "@phosphor-icons/react";
import "../../styles/components/Folder.css";

const FolderBreadcrumb = ({ folderId, onNavigate }) => {
  const { folders } = useFolders();
  const { currentTheme } = useTheme();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Build breadcrumb path when folder ID or folders change
  useEffect(() => {
    if (!folderId || folders.length === 0) {
      setBreadcrumbs([]);
      return;
    }

    // Helper function to find folder by ID
    const findFolder = (id) => folders.find(f => f._id === id);

    // Build breadcrumb path from current folder to root
    const buildPath = (currentId, path = []) => {
      const folder = findFolder(currentId);
      
      if (!folder) return path;
      
      const newPath = [folder, ...path];
      
      if (folder.parent_id) {
        return buildPath(folder.parent_id, newPath);
      }
      
      return newPath;
    };

    const path = buildPath(folderId);
    setBreadcrumbs(path);
  }, [folderId, folders]);

  return (
    <nav className="folder-breadcrumb">
      <div className="folder-breadcrumb-item">
        <span
          className="folder-breadcrumb-link"
          onClick={() => onNavigate(null)}
          title="All Folders"
        >
          <House size={16} weight="bold" />
        </span>
      </div>

      {breadcrumbs.map((folder, index) => (
        <React.Fragment key={folder._id}>
          <div className="folder-breadcrumb-separator">
            <CaretRight size={14} />
          </div>
          <div className="folder-breadcrumb-item">
            <span
              className="folder-breadcrumb-link"
              onClick={() => onNavigate(folder._id)}
              title={folder.name}
            >
              {folder.name}
            </span>
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

FolderBreadcrumb.propTypes = {
  folderId: PropTypes.string,
  onNavigate: PropTypes.func.isRequired
};

export default FolderBreadcrumb;