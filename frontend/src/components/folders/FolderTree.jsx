import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFolders } from "../../context/FolderContext";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/components/Folder.css";
import {
  FolderOpen,
  FolderPlus,
  FolderNotch,
  PencilSimple,
  Trash,
  CaretDown,
  CaretRight,
} from "@phosphor-icons/react";

const FolderTreeItem = ({ folder, level = 0, activeFolder, onFolderSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const { openEditFolderModal, handleDeleteFolder } = useFolders();
  const hasChildren = folder.children && folder.children.length > 0;
  const isActive = activeFolder === folder._id;

  const handleToggle = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    onFolderSelect(folder._id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    openEditFolderModal(folder);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteFolder(folder._id);
  };

  return (
    <div>
      <div
        className={`folder-tree-item ${isActive ? "active" : ""}`}
        style={{ paddingLeft: `${level * 0.5}rem` }}
        onClick={handleSelect}
      >
        <div className="folder-tree-item-content">
          {hasChildren ? (
            <button className="folder-action-button" onClick={handleToggle}>
              {expanded ? (
                <CaretDown size={16} weight="bold" />
              ) : (
                <CaretRight size={16} weight="bold" />
              )}
            </button>
          ) : (
            <div className="w-4"></div> {/* Spacer */} 
          ){"}"}

          <div className="folder-tree-item-icon">
            {isActive ? (
              <FolderOpen size={18} weight="fill" />
            ) : (
              <FolderNotch size={18} />
            )}
          </div>
          <span className="truncate">{folder.name}</span>
        </div>

        <div className="folder-tree-item-actions">
          <button
            className="folder-action-button"
            onClick={handleEdit}
            title="Edit folder"
          >
            <PencilSimple size={16} />
          </button>
          <button
            className="folder-action-button"
            onClick={handleDelete}
            title="Delete folder"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      {expanded && hasChildren && (
        <div className="folder-tree-item-children">
          {folder.children.map((childFolder) => (
            <FolderTreeItem
              key={childFolder._id}
              folder={childFolder}
              level={level + 1}
              activeFolder={activeFolder}
              onFolderSelect={onFolderSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderTree = ({ onFolderSelect }) => {
  const { folderTree, activeFolder, openCreateFolderModal } = useFolders();
  const { currentTheme } = useTheme();

  return (
    <div className="folder-tree">
      <div className="folders-sidebar-header">
        <h3>Folders</h3>
        <button
          className="folder-action-button"
          onClick={() => openCreateFolderModal()}
          title="Create root folder"
        >
          <FolderPlus size={18} />
        </button>
      </div>

      <div>
        {folderTree.length === 0 ? (
          <div className="folder-empty-state">
            <p className="text-center text-sm">No folders yet</p>
            <button
              className="btn btn-outline btn-sm mt-2"
              onClick={() => openCreateFolderModal()}
            >
              Create Folder
            </button>
          </div>
        ) : (
          folderTree.map((folder) => (
            <FolderTreeItem
              key={folder._id}
              folder={folder}
              level={0}
              activeFolder={activeFolder}
              onFolderSelect={onFolderSelect}
            />
          ))
        )}
      </div>
    </div>
  );
};

FolderTreeItem.propTypes = {
  folder: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.array
  }).isRequired,
  level: PropTypes.number,
  activeFolder: PropTypes.string,
  onFolderSelect: PropTypes.func.isRequired
};

FolderTree.propTypes = {
  onFolderSelect: PropTypes.func.isRequired
};

export default FolderTree;