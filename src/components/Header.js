import React from 'react';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css'; // Ensure this path is correct
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio, Button } from "@nextui-org/react";

function Header({ isRestricted }) {
    const [selectedColor, setSelectedColor] = React.useState("default");

    const { user, logout } = useAuth();
    const router = useRouter();


    return (
        <div className={styles.headerContainer}>
            <img
                src="https://source.unsplash.com/random"
                alt="Header Background"
                className={styles.backgroundImage}
            />
            <div className={styles.overlayBKG}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>Financial Toolbox</h1>
                <p className={styles.subtitle}>
                    {isRestricted && user ? `Welcome, ${user.username}` : "Your personal financial coach in your pocket."}
                </p>
            </div>
            {isRestricted && (
                <div className="flex flex-col gap-3">
                    <Table 
                        color={selectedColor}
                        selectionMode="single" 
                        aria-label="Example static collection table"
                    >
                        <TableHeader>
                            <TableColumn>CALCULATIONS</TableColumn>
                            <TableColumn>TOTAL</TableColumn>
                            <TableColumn>TIME</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>Morgage</TableCell>
                                <TableCell>300000</TableCell>
                                <TableCell>0:00:0</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>Investment</TableCell>
                                <TableCell>20000</TableCell>
                                <TableCell>0:00:0</TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell>Pension</TableCell>
                                <TableCell>536000</TableCell>
                                <TableCell>0:00:0</TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell>Morgage</TableCell>
                                <TableCell>400000</TableCell>
                                <TableCell>0:00:0</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default Header;
