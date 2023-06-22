import React from 'react'
import { Card, Button, CardActions, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { supabase } from "./supabaseData";

export const VisitorContent = (props) => {
    const stalls = props.stalls;
    return (
        <div>
            <Card variant='outlined'>
                <CardContent>
                    <Typography>Stall Name: {stalls.name}</Typography>
                    <Typography>Location: {stalls.location}</Typography>
                    <Typography>Price: {(stalls.price / stalls.customers).toFixed(2)}</Typography>
                    <Typography>Taste: {(stalls.taste / stalls.customers).toFixed(2)}</Typography>
                    <Typography>Environment: {(stalls.environment / stalls.customers).toFixed(2)}</Typography>
                    <Typography>Comment: {stalls.comment}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}