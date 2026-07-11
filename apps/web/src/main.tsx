import './styles.css';
import { registerServiceWorker } from './registerServiceWorker';
import { bootstrapApp } from '@ohino/navigation/src/appBootstrap';

registerServiceWorker();

// call the bootstrap which mounts into #root
bootstrapApp('#root').catch(err => console.error('OHINO bootstrap failed', err));
