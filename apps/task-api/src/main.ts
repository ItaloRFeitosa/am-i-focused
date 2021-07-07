import "reflect-metadata"

import { container } from 'tsyringe'
import { setupContainer } from "./ioc"
import { makeApp } from "./app"

setupContainer(container)
const app = makeApp(container)

app.listen(3000)

