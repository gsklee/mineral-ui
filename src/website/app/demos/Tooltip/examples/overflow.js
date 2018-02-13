/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import Button from '../../../../../Button';
import { createStyledComponent } from '../../../../../styles';
import Tooltip from '../../../../../Tooltip';

const OverflowContainer = createStyledComponent('div', {
  backgroundColor: 'aliceblue',
  overflow: 'hidden',
  padding: '10px'
});

export default {
  id: 'overflow',
  title: 'Overflow',
  description: `A Tooltip can extend beyond its bounding container (the blue
area in this example) even if the container has an \`overflow: hidden\` style.
See the [portal example](#portal) for even greater control.`,
  scope: { Button, OverflowContainer, Tooltip },
  source: `
    <OverflowContainer>
      <Tooltip
        content="Light years star stuff"
        placement="top"
        isOpen>
        <Button>Button</Button>
      </Tooltip>
    </OverflowContainer>`
};