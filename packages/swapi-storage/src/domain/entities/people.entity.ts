import {
  AggregateRoot,
  AuditEntry,
  UniqueEntityId,
  formatDate
} from '@softtek/shared'

interface PeopleProps extends AuditEntry {
  name: string
  height?: string
  mass?: string
  hair_color?: string
  skin_color?: string
  eye_color?: string
  birth_year?: string
  gender?: string
  homeworld_url?: string
}

export interface PeopleCreateProps extends AuditEntry {
  name: string
  height?: string
  mass?: string
  hair_color?: string
  skin_color?: string
  eye_color?: string
  birth_year?: string
  gender?: string
  homeworld_url?: string
  created_by?: string
}

export class People extends AggregateRoot<PeopleProps> {
  private constructor(props: PeopleProps, id?: UniqueEntityId) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }

  get height() {
    return this.props.height
  }

  get mass() {
    return this.props.mass
  }

  get hair_color() {
    return this.props.hair_color
  }

  get skin_color() {
    return this.props.skin_color
  }

  get eye_color() {
    return this.props.eye_color
  }

  get birth_year() {
    return this.props.birth_year
  }

  get gender() {
    return this.props.gender
  }

  get homeworld_url() {
    return this.props.homeworld_url
  }

  get created_by() {
    return this.props.created_by
  }

  get newEntryAudit() {
    return {
      created_at: this.props.created_at,
      created_by: this.props.created_by
    }
  }
  get updateEntryAudit() {
    return {
      updated_at: this.props.updated_at,
      updated_by: this.props.updated_by
    }
  }
  get deleteEntryAudit() {
    return {
      deleted_at: this.props.deleted_at,
      deleted_by: this.props.deleted_by
    }
  }

  get deleted() {
    return this.props.deleted
  }

  static create(props: PeopleCreateProps, id?: UniqueEntityId): People {
    const defaultProps: PeopleProps = {
      name: props.name,
      height: props.height || '',
      mass: props.mass || '',
      hair_color: props.hair_color || '',
      skin_color: props.skin_color || '',
      eye_color: props.eye_color || '',
      birth_year: props.birth_year || '',
      gender: props.gender || '',
      homeworld_url: props.homeworld_url || '',
      created_at: props.created_at || formatDate(new Date()),
      created_by: props.created_by || '',
    }

    const people = new People(defaultProps, id)

    return people
  }

  hasUpdates() {
    return Object.values(this.props).some(valueObject => valueObject.isModified)
  }

  createNewEntryAudit(document: string) {
    this.props.created_at = formatDate(new Date())
    this.props.created_by = document
    this.props.deleted = false
  }
  createUpdateEntryAudit(username: string) {
    this.props.updated_at = formatDate(new Date())
    this.props.updated_by = username
  }
  createDeleteEntryAudit(username: string) {
    this.props.deleted_at = formatDate(new Date())
    this.props.deleted_by = username
    this.props.deleted = true
  }
}
