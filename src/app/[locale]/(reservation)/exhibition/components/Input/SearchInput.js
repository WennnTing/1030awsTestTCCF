"use client";
import React, { useState, useRef } from 'react';
import { TextField, InputAdornment, IconButton, Popper, Paper, List, ListItem, ListItemText } from '@mui/material';
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ label, placeholder, helperText, error, onSearch }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const searchInputRef = useRef(null);

    const handleFocus = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (searchInputRef.current && !searchInputRef.current.contains(document.activeElement)) {
                setAnchorEl(null);
            }
        }, 100);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        if (onSearch) {
            const results = onSearch(event.target.value);
            setSearchResults(results);
        }
    };

    const handleSearchSelect = (id) => {
        setInputValue(id);
        setSearchTerm('');
        setSearchResults([]);
        setAnchorEl(null);
    };

    return (
        <div>
            <TextField
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                error={error}
                fullWidth
                value={inputValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    handleSearchChange(e);
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <FaSearch />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement="bottom-start"
                style={{ zIndex: 2000 }}
                modifiers={[{ name: 'preventOverflow', options: { boundary: 'viewport' } }]}
            >
                <Paper style={{ width: anchorEl?.clientWidth }}>
                    <List ref={searchInputRef}>
                        {searchResults.map((result, index) => (
                            <ListItem button key={index} onClick={() => handleSearchSelect(result.id)}>
                                <ListItemText primary={`${result.name} (${result.id})`} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Popper>
        </div>
    );
};

export default SearchInput;