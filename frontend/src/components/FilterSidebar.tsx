import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, toggleSkill } from '../store/slices/filtersSlice';
import type { RootState } from '../store/store';
import { useState } from 'react';
import { Card, Input, Checkbox } from 'antd';

const availableSkills = ['React', 'Node.js', 'Next.js', 'TypeScript', 'GraphQL'];

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.filters.searchTerm);
  const selectedSkills = useSelector((state: RootState) => state.filters.skills);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSkillToggle = (skill: string) => {
    dispatch(toggleSkill(skill));
  };

  return (
    <aside className="w-full md:w-72 sticky top-24 h-fit">
      <Card className="shadow-sm">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-3">Search</h2>
            <Input
              placeholder="Search by keyword..."
              value={localSearchTerm}
              onChange={handleSearchChange}
              allowClear
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Skills</h2>
            <div className="space-y-2">
              {availableSkills.map((skill) => (
                <Checkbox
                  key={skill}
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                >
                  {skill}
                </Checkbox>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </aside>
  );
};

export default FilterSidebar;
