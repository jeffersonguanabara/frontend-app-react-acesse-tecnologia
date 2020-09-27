import React from 'react';

import api from './api';

import { Process } from '../components/ProcessItem';


export class ProcessService {

    constructor() { }

    async function create (process: Process) {
        const processSave = await api.post('processos', {
            process
        });
    }
}